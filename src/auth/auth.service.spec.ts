import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { userRepositoryMock } from 'test/mocks/user-repository.mock';
import { jwtServiceMock } from 'test/mocks/jwt-service.mock';
import { userServiceMock } from 'test/mocks/user-service.mock';
import { mailerServiceMock } from 'test/mocks/mailer-service.mock';
import { accessTokenMock } from 'test/mocks/token.mock';
import { jwtPayloadMock } from 'test/mocks/jwt-payload.mock';
import { payloadMock } from 'test/mocks/payload.mock';
import { resetTokenMock } from 'test/mocks/reset-token.mock';
import { authSignupDTOMock } from 'test/mocks/auth-signup-dto.mock';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService, userRepositoryMock, jwtServiceMock, userServiceMock, mailerServiceMock],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('token', () => {
		it('should be called verifyToken method', async () => {
			const result = await service.verifyToken(accessTokenMock);

			expect(result).toEqual(jwtPayloadMock);
		});

		it('should be valid token', () => {
			const result = service.isValid(accessTokenMock);

			expect(result).toBeTruthy();
		});
	});

	describe('Authentication', () => {
		it('should be called signin method', async () => {
			const result = await service.signin({ email: 'alice@example.com', password: '123456' });

			expect(result).toEqual(payloadMock);
		});

		it('should be called signup method', async () => {
			const result = await service.signup(authSignupDTOMock);

			expect(result).toEqual(payloadMock);
		});

		it('should be called forget method', async () => {
			const result = await service.forget('test@test.com');

			expect(result).toEqual({ message: 'user recovery successful, access your email to recovery your acount.' });
		});

		it('should be called recovery method', async () => {
			const result = await service.recover({ password: '123456', token: resetTokenMock });

			expect(result).toEqual(payloadMock);
		});
	});
});
