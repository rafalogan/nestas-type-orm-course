import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { userServiceMock } from 'test/mocks/user-service.mock';

describe('UserController', () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [userServiceMock],
		}).compile();

		controller = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
