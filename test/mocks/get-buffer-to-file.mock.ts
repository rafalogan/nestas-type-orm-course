import { createReadStream } from 'node:fs';

export const getBufferToFileMock = (filename: string): Promise<any> => {
	const readStream = createReadStream(filename);
	const chunks = [];

	return new Promise((resolve, reject) => {
		readStream.on('data', chunk => chunks.push(chunk));
		readStream.on('error', err => reject(err));
		readStream.on('close', () =>
			resolve({
				buffer: Buffer.concat(chunks) as Buffer,
				stream: readStream,
			}),
		);
	});
};
