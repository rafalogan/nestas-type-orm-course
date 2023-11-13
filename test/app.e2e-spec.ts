import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { authSignupDTOMock } from './mocks/auth-signup-dto.mock';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
	});

	it('signup new user', async () => {
		const response = await request(app.getHttpServer).post('/auth/signup').send(authSignupDTOMock);

		expect(response.statusCode).toEqual(201);
		expect(typeof response.body.accessToken).toEqual('string');
	});

	afterEach(async () => {
		await app.close();
	});
});
