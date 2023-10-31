import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';
import { Observable } from 'rxjs';

import { RULES_KEY } from 'src/decorators/rules.decorator';
import { Rule } from 'src/enums/rule.enum';

@Injectable()
export class RuleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRules = this.reflector.getAllAndOverride<Rule[]>(RULES_KEY, [context.getHandler(), context.getClass()]);
		const request = context.switchToHttp().getRequest();
		const { user } = request;

		if (!requiredRules) return true;

		log('required', { requiredRules, user });

		const rulesFitred = requiredRules?.filter(i => user.rule >= i);

		return !!rulesFitred.length;
	}
}
