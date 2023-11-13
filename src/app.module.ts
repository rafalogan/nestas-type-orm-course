import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { UserEntity } from './user/entities/user.entity';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 100,
			},
		]),
		forwardRef(() => UserModule),
		forwardRef(() => AuthModule),
		FileModule,
		MailerModule.forRoot({
			transport: {
				host: process.env.MAILER_HOST,
				port: Number(process.env.MAILER_PORT),
				auth: {
					user: process.env.MAILER_USER,
					pass: process.env.MAILER_PASSWORD,
				},
			},
			defaults: {
				from: '"teste nest" <kristian.lang98@ethereal.email>',
			},
			template: {
				dir: __dirname + '/templates',
				adapter: new PugAdapter(),
				options: {
					strict: true,
				},
			},
		}),
		TypeOrmModule.forRoot({
			type: process.env.DATABASE_TYPE as 'mysql',
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			entities: [UserEntity],
			synchronize: process.env.NODE_ENV === 'development',
		}),
	],
	controllers: [AppController],
	providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
