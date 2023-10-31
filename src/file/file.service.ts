import { BadRequestException, Injectable } from '@nestjs/common';
import { error } from 'node:console';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

@Injectable()
export class FileService {
	constructor() {}

	async upload(file: Express.Multer.File, filename: string, folder = 'upload') {
		try {
			const path = resolve(__dirname, '..', '..', './tmp/storage', folder);

			if (process.env.STORAGE === 'local' && !existsSync(path)) {
				await mkdir(path, { recursive: true });
			}

			await writeFile(join(path, filename), file.buffer);

			return { message: 'file uploaded successfully' };
		} catch (err: any) {
			error('Error on upload', err);

			return new BadRequestException('error on upload fie');
		}
	}
}
