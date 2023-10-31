import { ExecutionContext, NotFoundException, createParamDecorator } from '@nestjs/common';
import { existsOrError } from 'src/utils';

export const User = createParamDecorator((args: string[], context: ExecutionContext) => {
	const request = context.switchToHttp().getRequest();
	const { user } = request;

	if (args?.length) return filter(user, ...args);

	if (user) return user;

	return new NotFoundException('user not found');
});

const filter = (user: any, ...args: string[]) => {
	try {
		const res = {};

		for (const key of args) {
			const value = user[key];

			if (value) res[key] = user[key];
		}

		existsOrError(Object.keys(res).length, new NotFoundException('user field not found'));

		return res;
	} catch (err: any) {
		return err;
	}
};
