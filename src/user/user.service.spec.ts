import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from './user.service';
import { userRepositoryMock } from 'test/mocks/user-repository.mock';
import { CreateUserDto } from './dto/create-user.dto';
import { userEntityListMock } from 'test/mocks/user-entity-list.mock';
import { createUserDTOMock } from 'test/mocks/create-user-dto.mock';
import { UserEntity } from './entities/user.entity';
import { UpdateUserPatchDto } from './dto/update-patch-user.dto';
import { userUpdatePatchDTOMock } from 'test/mocks/user-patch-dto.mock';
import { userDeletedMock } from 'test/mocks/user-deleted.mock';

describe('UserService', () => {
	let service: UserService;
	let userRepository: Repository<UserEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, userRepositoryMock],
		}).compile();

		service = module.get<UserService>(UserService);
		userRepository = module.get(getRepositoryToken(UserEntity));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(userRepository).toBeDefined();
	});

	it('should be user method create', async () => {
		const data: CreateUserDto = createUserDTOMock;

		jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
		const result = await service.create(data);

		expect(result).toEqual(userEntityListMock[0]);
	});

	it('shoud be called method find()', async () => {
		const result = await service.find();

		expect(result).toEqual(userEntityListMock);
	});

	it('should be called method findOne()', async () => {
		const result = await service.findOne(2);

		expect(result).toEqual(userEntityListMock[1]);
	});

	it('should be called method update()', async () => {
		const data: UpdateUserPatchDto = userUpdatePatchDTOMock;

		const result = await service.update(data, 2);

		expect(result).toEqual(userEntityListMock[1]);
	});

	it('should be called method delete', async () => {
		const result = await service.delete(2);

		expect(result).toEqual(userDeletedMock);
	});
});
