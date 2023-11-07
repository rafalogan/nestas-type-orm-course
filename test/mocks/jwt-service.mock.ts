import { JwtService } from '@nestjs/jwt';
import { accessTokenMock } from './token.mock';
import { jwtPayloadMock } from './jwt-payload.mock';

export const jwtServiceMock = {
	provide: JwtService,
	useValue: {
		sign: jest.fn().mockReturnValue(accessTokenMock),
		verify: jest.fn().mockReturnValue(jwtPayloadMock),
	},
};
