import { Rule } from 'src/enums/rule.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export const createUserDTOMock: CreateUserDto = {
	name: 'Alice Johnson',
	email: 'alice@example.com',
	password: '123456',
	birthAt: '1990-01-15T00:00:00Z',
	rule: Rule.user,
};
