import { IsJWT } from 'class-validator';

export class AuthTokenVerifyDTO {
	@IsJWT()
	token: string;
}
