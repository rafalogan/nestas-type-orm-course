import { BadRequestException, Catch, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MailerService } from '@nestjs-modules/mailer';

import { AuthSigninDTO } from './dto/auth-signin.dto';
import { PrismaService } from 'src/database/prisma.service';
import { existsOrError } from 'src/utils';
import { AuthRecoveryDTO } from './dto/auth-recovery.dto';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { AuthSignupDTO } from './dto/auth-signup.dto';
import { error } from 'console';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
	private audience = 'signin';
	private issuer = 'user';

	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly mailer: MailerService,
	) {}

	verifyToken(token: string) {
		try {
			const data = this.jwtService.verify(token, { audience: this.audience, issuer: this.issuer });
			return data;
		} catch (err: any) {
			throw new BadRequestException(err);
		}
	}

	isValid(token: string) {
		try {
			this.verifyToken(token);
			return true;
		} catch (err) {
			error('erro to validate token: ', err);
			return false;
		}
	}

	async signin(credentials: AuthSigninDTO) {
		const { email, password } = credentials;
		const user = await this.prisma.user.findFirst({ where: { email } });

		existsOrError(user, new UnauthorizedException('user unauthorized. verify your email or password and try aigate again'));

		const isMatch = await compare(password, user.password);

		existsOrError(isMatch, new UnauthorizedException('user unauthorized. verify your email or password and try aigate again'));

		return this.generateToken(user);
	}

	async signup(data: AuthSignupDTO) {
		const user = await this.userService.create(data);

		existsOrError(user, new InternalServerErrorException('signup failed internal error'));

		return this.generateToken(user);
	}

	async forget(email: string) {
		const user = await this.prisma.user.findUnique({ where: { email } });

		existsOrError(user, new UnauthorizedException('invalid email'));

		const { id } = user;

		const token = this.jwtService.sign(
			{ id, email },
			{
				expiresIn: '30 minutes',
				subject: String(id),
				issuer: 'forget',
				audience: this.audience,
			},
		);

		await this.mailer.sendMail({
			subject: 'Password recovery',
			to: email,
			template: 'forget',
			context: {
				name: '',
				token,
			},
		});

		return { message: 'user recovery successful, access your email to recovery your acount.' };
	}

	async recover(data: AuthRecoveryDTO) {
		try {
			const { password: newPassword, token } = data;

			const { id } = this.jwtService.verify(token, { audience: this.audience, issuer: 'forget' });
			const password = await hash(newPassword, await genSalt());

			const user = await this.prisma.user.update({
				where: { id },
				data: {
					password,
				},
			});

			return this.generateToken(user);
		} catch (err: any) {
			throw new BadRequestException(err);
		}
	}

	private async generateToken(user: User) {
		existsOrError(user?.active, new UnauthorizedException('user unauthorized'));

		const { id, name, email, birthAt, rule } = user;

		const accessToken = this.jwtService.sign(
			{ id, name, email, birthAt, rule },
			{ expiresIn: '7 days', subject: `${id}`, issuer: this.issuer, audience: this.audience },
		);

		return { id, name, email, birthAt, accessToken };
	}
}
