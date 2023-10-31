import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check/user-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [DatabaseModule, forwardRef(() => AuthModule)],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UserIdCheckMiddleware).forRoutes({ path: 'users/:id', method: RequestMethod.ALL });
	}
}
