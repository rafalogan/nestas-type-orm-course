import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { log } from 'node:console';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const dt = Date.now();

		return next.handle().pipe(
			tap(() => {
				const request = context.switchToHttp().getRequest();

				log('URL:', request.url);
				log('METHOD:', request.method);
				log('excecute time on miliseconds:', Date.now() - dt);
			}),
		);
	}
}
