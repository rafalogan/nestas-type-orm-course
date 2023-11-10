import {
	Body,
	Controller,
	FileTypeValidator,
	Get,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

import { AuthSigninDTO } from './dto/auth-signin.dto';
import { AuthSignupDTO } from './dto/auth-signup.dto';
import { AuthRecoveryDTO } from './dto/auth-recovery.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { FileService } from 'src/file/file.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly fileService: FileService,
	) {}

	@Post('/signin')
	signin(@Body() body: AuthSigninDTO) {
		return this.authService.signin(body);
	}

	@Post('/signup')
	signup(@Body() body: AuthSignupDTO) {
		return this.authService.signup(body);
	}

	@Post('/forget')
	forget(@Body() body: AuthForgetDTO) {
		return this.authService.forget(body.email);
	}

	@Post('recovery')
	recovery(@Body() body: AuthRecoveryDTO) {
		return this.authService.recover(body);
	}

	@UseGuards(AuthGuard)
	@Get('verify-token')
	verifyToken(@User(['id', 'name']) user: UserEntity) {
		return user;
	}

	@UseInterceptors(FileInterceptor('file'))
	@UseGuards(AuthGuard)
	@Post('photo')
	async uploadPhoto(
		@User() user: UserEntity,
		@UploadedFile(
			new ParseFilePipe({
				validators: [new FileTypeValidator({ fileType: 'image/*' }), new MaxFileSizeValidator({ maxSize: 1024 * 50 })],
			}),
		)
		file: Express.Multer.File,
	) {
		const filename = `photo-${user.id}.${file.originalname.split('.')[1]}`;

		return this.fileService.upload(file, filename, 'photo');
	}

	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'photo', maxCount: 1 },
			{ name: 'documents', maxCount: 10 },
		]),
	)
	@UseGuards(AuthGuard)
	@Post('files')
	async uploadFiles(@User() user: any, @UploadedFiles() files: { photo: Express.Multer.File; documents: Express.Multer.File[] }) {
		return { ...files };
	}
}
