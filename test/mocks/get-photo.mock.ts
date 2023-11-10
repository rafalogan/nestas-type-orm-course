import { resolve } from 'node:path';
import { getBufferToFileMock } from './get-buffer-to-file.mock';

export const getPhotoMock = async () => {
	const { stream, buffer } = await getBufferToFileMock(resolve(__dirname, '..', 'photo-test.jpg'));

	const photo: Express.Multer.File = {
		fieldname: 'file',
		originalname: 'photo-test.jpg',
		encoding: '7bit',
		mimetype: 'image/jpg',
		size: 1024 * 50,
		stream,
		destination: '',
		filename: 'filename',
		path: 'file-path',
		buffer,
	};

	return photo;
};
