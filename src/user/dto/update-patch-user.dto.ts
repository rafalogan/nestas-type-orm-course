import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserPatchDto extends PartialType(CreateUserDto) {}
