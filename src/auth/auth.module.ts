import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { FileModule } from 'src/file/file.module';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
	imports: [
		JwtModule.register({
			secret: String(process.env.AUTHSECRET),
		}),
		forwardRef(() => UserModule),
		FileModule,
		TypeOrmModule.forFeature([UserEntity]),
	],
	exports: [AuthService],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
