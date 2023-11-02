import { Rule } from 'src/enums/rule.enum';
import { UpdatePutUserDTO } from 'src/user/dto/update-put-user.dto';

export const useUpdatePutDTOMock: UpdatePutUserDTO = {
	name: 'Alice Johnson',
	email: 'alice@example.com',
	password: '123456',
	birthAt: '1990-01-15T00:00:00Z',
	rule: Rule.user,
};
