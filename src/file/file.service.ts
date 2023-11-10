import { BadRequestException, Injectable } from '@nestjs/common';
import { error } from 'node:console';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

@Injectable()
export class FileService {
	private isLocalStorage = !process.env.STORAGE || process.env.STORAGE.toLowerCase() === 'local';
	constructor() {}

	async upload(file: Express.Multer.File, filename: string, folder = 'upload') {
		try {
			const path = resolve(__dirname, '..', '..', './tmp/storage', folder);

			if (this.isLocalStorage && !existsSync(path)) {
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
