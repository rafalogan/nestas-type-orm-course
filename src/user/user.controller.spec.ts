import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { userServiceMock } from 'test/mocks/user-service.mock';
import { AuthGuard } from 'src/guards/auth.guard';
import { guardMock } from 'test/mocks/guard.mock';
import { RuleGuard } from 'src/guards/rule.guard';
import { UserService } from './user.service';
import { createUserDTOMock } from 'test/mocks/create-user-dto.mock';
import { userEntityListMock } from 'test/mocks/user-entity-list.mock';
import { userUpdatePatchDTOMock } from 'test/mocks/user-patch-dto.mock';
import { userUpdatePutDTOMock } from 'test/mocks/user-put-dto.mock';
import { userDeletedMock } from 'test/mocks/user-deleted.mock';

describe('UserController', () => {
	let controller: UserController;
	let userService: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [userServiceMock],
		})
			.overrideGuard(AuthGuard)
			.useValue(guardMock)
			.overrideGuard(RuleGuard)
			.useValue(guardMock)
			.compile();

		controller = module.get<UserController>(UserController);
		userService = module.get<UserService>(UserService);
	});

	describe('Guards validation', () => {
		it('should be applicated Guards', async () => {
			const result = Reflect.getMetadata('__guards__', UserController);

			expect(result.length).toEqual(2);
			expect(new result[0]()).toBeInstanceOf(AuthGuard);
			expect(new result[1]()).toBeInstanceOf(RuleGuard);
		});
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(userService).toBeDefined();
	});

	it('should be called create method', async () => {
		const result = await controller.create(createUserDTOMock);

		expect(result).toEqual(userEntityListMock[1]);
	});

	it('should be called read method', async () => {
		const result = await controller.read();

		expect(result).toEqual(userEntityListMock);
	});

	it('should be called readOne method', async () => {
		const result = await controller.readOne(2);
		expect(result).toEqual(userEntityListMock[0]);
	});

	it('should be called edit methods', async () => {
		const result = await controller.edit(1, userUpdatePutDTOMock);

		expect(result).toEqual(userUpdatePatchDTOMock);
	});

	it('should be called editPartial methods', async () => {
		const result = await controller.editPartial(1, userUpdatePatchDTOMock);

		expect(result).toEqual(userUpdatePatchDTOMock);
	});

	it('should be called delete method', async () => {
		const result = await controller.delete(1);

		expect(result).toEqual(userDeletedMock);
	});
});
