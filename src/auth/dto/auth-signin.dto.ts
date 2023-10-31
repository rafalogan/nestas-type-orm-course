import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthSigninDTO {
	@IsEmail()
	email: string;

	@IsStrongPassword({
		minLength: 6,
		minNumbers: 0,
		minLowercase: 0,
		minUppercase: 0,
		minSymbols: 0,
	})
	password: string;
}
