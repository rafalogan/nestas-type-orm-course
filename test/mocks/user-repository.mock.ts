import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { userEntityListMock } from './user-entity-list.mock';

export const userRepositoryMock = {
	provide: getRepositoryToken(UserEntity),
	useValue: {
		create: jest.fn(),
		save: jest.fn().mockResolvedValue(userEntityListMock[0]),
		find: jest.fn().mockResolvedValue(userEntityListMock),
		findOne: jest.fn().mockResolvedValue(userEntityListMock[1]),
		update: jest.fn(),
		delete: jest.fn(),
	},
};
