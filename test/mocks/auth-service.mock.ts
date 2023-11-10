import { AuthService } from 'src/auth/auth.service';
import { payloadMock } from './payload.mock';
import { jwtPayloadMock } from './jwt-payload.mock';

export const authServiceMock = {
	provide: AuthService,
	useValue: {
		verifyToken: jest.fn().mockResolvedValue(jwtPayloadMock),
		isValid: jest.fn().mockReturnValue(true),
		signin: jest.fn().mockResolvedValue(payloadMock),
		signup: jest.fn().mockResolvedValue(payloadMock),
		forget: jest.fn().mockResolvedValue({ message: 'user recovery successful, access your email to recovery your acount.' }),
		recover: jest.fn().mockResolvedValue(payloadMock),
		generateToken: jest.fn().mockResolvedValue(payloadMock),
	},
};
