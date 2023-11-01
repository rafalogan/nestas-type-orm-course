import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check/user-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from './entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule)],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UserIdCheckMiddleware).forRoutes({ path: 'users/:id', method: RequestMethod.ALL });
	}
}
