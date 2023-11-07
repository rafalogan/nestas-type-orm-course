import { UserService } from 'src/user/user.service';
import { userEntityListMock } from './user-entity-list.mock';
import { userDeletedMock } from './user-deleted.mock';
import { userUpdatePatchDTOMock } from './user-patch-dto.mock';

export const userServiceMock = {
	provide: UserService,
	useValue: {
		create: jest.fn().mockResolvedValue(userEntityListMock[1]),
		find: jest.fn().mockResolvedValue(userEntityListMock),
		findOne: jest.fn().mockResolvedValue(userEntityListMock[0]),
		update: jest.fn().mockResolvedValue(userUpdatePatchDTOMock),
		delete: jest.fn().mockResolvedValue(userDeletedMock),
	},
};
