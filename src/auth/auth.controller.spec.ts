import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { guardMock } from 'test/mocks/guard.mock';
import { authServiceMock } from 'test/mocks/auth-service.mock';
import { fileServiceMock } from 'test/mocks/file-service.mock';
import { authSignupDTOMock } from 'test/mocks/auth-signup-dto.mock';
import { payloadMock } from 'test/mocks/payload.mock';
import { authForgetDTOMock } from 'test/mocks/auth-forget-dto.mock';
import { authRecoveryDTOMock } from 'test/mocks/auth-recovey-dto.mock';
import { userEntityListMock } from 'test/mocks/user-entity-list.mock';

import { getPhotoMock } from 'test/mocks/get-photo.mock';
import { authSigninDTOMock } from 'test/mocks/auth-signin-dto.mock';
import { userServiceMock } from 'test/mocks/user-service.mock';
import { UserService } from 'src/user/user.service';

describe('AuthController', () => {
	let controller: AuthController;
	let userService: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [authServiceMock, fileServiceMock, userServiceMock],
		})
			.overrideGuard(AuthGuard)
			.useValue(guardMock)
			.compile();

		controller = module.get<AuthController>(AuthController);
		userService = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(userService).toBeDefined();
	});

	it('should be applicated Guards', () => {
		// const result = Reflect.getMetadata('__guards__', AuthController);
		// expect(result.length).toEqual(1);
		// expect(new result[0]()).toBeInstanceOf(AuthGuard);
	});

	it('should be called signin', async () => {
		jest.spyOn(userService, 'findOne').mockResolvedValueOnce(userEntityListMock[0]);
		const result = await controller.signin(authSigninDTOMock);

		expect(result).toEqual(payloadMock);
	});

	it('should be called signup', async () => {
		const result = await controller.signup(authSignupDTOMock);

		expect(result).toEqual(payloadMock);
	});

	it('should be called forget', async () => {
		const result = await controller.forget(authForgetDTOMock);

		expect(result).toEqual({ message: 'user recovery successful, access your email to recovery your acount.' });
	});

	it('should be called recovery', async () => {
		const result = await controller.recovery(authRecoveryDTOMock);

		expect(result).toEqual(payloadMock);
	});

	it('should be called verifyToken', async () => {
		const result = controller.verifyToken(userEntityListMock[1]);

		expect(result).toEqual(userEntityListMock[1]);
	});

	it('should be called uploadPhoto', async () => {
		const photo = await getPhotoMock();
		const result = await controller.uploadPhoto(userEntityListMock[0], photo);

		expect(result).toEqual({ message: 'file uploaded successfully' });
	});
});
