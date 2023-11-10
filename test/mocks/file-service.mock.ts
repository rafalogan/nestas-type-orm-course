import { FileService } from 'src/file/file.service';

export const fileServiceMock = {
	provide: FileService,
	useValue: {
		upload: jest.fn().mockResolvedValue({ message: 'file uploaded successfully' }),
	},
};
