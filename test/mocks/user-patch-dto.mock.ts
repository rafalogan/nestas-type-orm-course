import { Rule } from 'src/enums/rule.enum';
import { UpdateUserPatchDto } from 'src/user/dto/update-patch-user.dto';

export const userUpdatePatchDTOMock: UpdateUserPatchDto = {
	name: 'Alice Johnson',
	email: 'alice@example.com',
	rule: Rule.user,
};
