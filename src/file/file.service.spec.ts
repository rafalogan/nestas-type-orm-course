import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getPhotoMock } from 'test/mocks/get-photo.mock';

describe('FileService', () => {
	let service: FileService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FileService],
		}).compile();

		service = module.get<FileService>(FileService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should be called upload method', async () => {
		const photMock = await getPhotoMock();
		const result = await service.upload(photMock, 'photo-teste.jpg');

		expect(result).toEqual({ message: 'file uploaded successfully' });
	});
});
