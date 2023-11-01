import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdateUserPatchDto } from './dto/update-patch-user.dto';
import { existsOrError, notExistisOrError } from 'src/utils';
import { genSalt, hash } from 'bcrypt';
import { log } from 'console';
import { UserEntity } from './entities/user.entity';
import { exit } from 'process';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	async create(user: CreateUserDto) {
		try {
			const fromDb = await this.userRepository.findOne({ where: { email: user.email } });

			notExistisOrError(fromDb, new BadRequestException('user email already exists'));
			const birthAt = user?.birthAt ? new Date(user.birthAt) : null;
			const salt = await genSalt();
			const password = await hash(user.password, salt);

			log('salt rounds', salt);

			const toSave = this.userRepository.create({ ...user, password, updatedAt: new Date(), birthAt });

			return this.userRepository.save(toSave);
		} catch (err: any) {
			return err;
		}
	}

	async find() {
		return this.userRepository.find();
	}

	async findOne(id: number) {
		const res = await this.userRepository.findOne({ where: { id } });

		existsOrError(res, new NotFoundException('user not found'));
		return res;
	}

	async update(upUser: UpdatePutUserDTO | UpdateUserPatchDto, id: number) {
		const user = await this.findOne(id);
		const birthAt = upUser?.birthAt ? new Date(upUser?.birthAt) : user?.birthAt ? new Date(user.birthAt) : undefined;
		const password = upUser?.password ? await hash(upUser.password, await genSalt()) : user.password;

		existsOrError(user, new NotFoundException('user not found'));

		await this.userRepository.update({ id }, { ...upUser, birthAt, password });

		return this.findOne(id);
	}

	async delete(id: number) {
		const user = await this.findOne(id);

		existsOrError(user, new NotFoundException(`user not fund in register: ${id}`));

		await this.userRepository.delete({ id });

		return { message: 'user successfully deleted', data: user };
	}
}
