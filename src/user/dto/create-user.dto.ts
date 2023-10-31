import { Optional } from '@nestjs/common';
import { IsEmail, IsString, IsStrongPassword, IsDateString, IsOptional, IsEnum } from 'class-validator';

import { Rule } from 'src/enums/rule.enum';

export class CreateUserDto {
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsStrongPassword({
		minLength: 6,
		minNumbers: 0,
		minSymbols: 0,
		minLowercase: 0,
		minUppercase: 0,
	})
	password: string;

	@Optional()
	@IsDateString()
	birthAt: string;

	@IsOptional()
	@IsEnum(Rule)
	rule: number;
}
