import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { log } from 'node:console';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserIdCheckMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		log('init cheked');
		if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
			throw new BadRequestException('Invalid id');
		}

		log('end check');
		next();
	}
}
