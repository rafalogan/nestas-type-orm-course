import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { error } from 'console';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) { }

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const { authorization } = request.headers;

		try {
			const token = authorization ? authorization?.split(' ')[1] : '';
			const data = this.authService.verifyToken(token);
			request.payload = data;
			request.user = await this.userService.findOne(data.id);

			return true;
		} catch (err) {
			error('erro to guard', err);
			return false;
		}
	}
}
