import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdateUserPatchDto } from './dto/update-patch-user.dto';
import { existsOrError } from 'src/utils';
import { genSalt, hash } from 'bcrypt';
import { log } from 'console';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(user: CreateUserDto) {
		try {
			const birthAt = user?.birthAt ? new Date(user.birthAt) : null;
			const salt = await genSalt();
			const password = await hash(user.password, salt);

			log('salt rounds', salt);

			return this.prisma.user.create({ data: { ...user, password, updatedAt: new Date(), birthAt } });
		} catch (err: any) {
			return err;
		}
	}

	async find() {
		return this.prisma.user.findMany();
	}

	async findOne(id: number) {
		const res = await this.prisma.user.findUnique({ where: { id } });

		existsOrError(res, new NotFoundException('user not found'));
		return res;
	}

	async update(upUser: UpdatePutUserDTO | UpdateUserPatchDto, id: number) {
		const user = await this.findOne(id);
		const birthAt = upUser?.birthAt ? new Date(upUser?.birthAt) : user?.birthAt ? new Date(user.birthAt) : undefined;
		const password = upUser.password ? await hash(upUser.password, await genSalt()) : user.password;

		existsOrError(user, new NotFoundException('user not found'));

		return this.prisma.user.update({
			data: { ...upUser, updatedAt: new Date(), birthAt, password },
			where: { id },
		});
	}

	async delete(id: number) {
		const user = await this.findOne(id);

		existsOrError(user, new NotFoundException(`user not fund in register: ${id}`));

		await this.prisma.user.delete({ where: { id } });

		return { message: 'user successfully deleted', data: user };
	}
}
