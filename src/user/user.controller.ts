import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { log } from 'node:console';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdateUserPatchDto } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Rules } from 'src/decorators/rules.decorator';
import { Rule } from 'src/enums/rule.enum';
import { RuleGuard } from 'src/guards/rule.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { SkipThrottle } from '@nestjs/throttler';
// import { LogInterceptor } from 'src/interceptors/log/log.interceptor';

// @UseInterceptors(LogInterceptor)
@Rules(Rule.Admin)
@UseGuards(AuthGuard, RuleGuard)
@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	// @UseInterceptors(LogInterceptor)
	@Post()
	async create(@Body() body: CreateUserDto) {
		return this.userService.create(body);
	}

	@SkipThrottle()
	@Get()
	async read() {
		return this.userService.find();
	}

	@Get(':id')
	async readOne(@ParamId() id: number) {
		log('verify id', id);
		return this.userService.findOne(id);
	}

	@Put(':id')
	async edit(@ParamId() id: number, @Body() body: UpdatePutUserDTO) {
		return this.userService.update(body, id);
	}

	@Patch(':id')
	async editPartial(@ParamId() id: number, @Body() body: UpdateUserPatchDto) {
		return this.userService.update(body, id);
	}

	@Delete(':id')
	async delete(@ParamId() id: number) {
		return this.userService
			.delete(id)
			.then(res => res)
			.catch(err => err);
	}
}
