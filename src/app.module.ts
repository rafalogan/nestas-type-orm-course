import { Module, forwardRef } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 100,
			},
		]),
		forwardRef(() => UserModule),
		DatabaseModule,
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
	],
	controllers: [AppController],
	providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
