import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { FileModule } from 'src/file/file.module';

console.log('auth secret', process.env.AUTHSECRET);

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.AUTHSECRET,
		}),
		forwardRef(() => UserModule),
		DatabaseModule,
		FileModule,
	],
	exports: [AuthService],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
