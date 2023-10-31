import { SetMetadata } from '@nestjs/common';

import { Rule } from 'src/enums/rule.enum';

export const RULES_KEY = 'rules';
export const Rules = (...args: Rule[]) => SetMetadata(RULES_KEY, args);
