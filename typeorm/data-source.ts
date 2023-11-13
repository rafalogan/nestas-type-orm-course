import dotenv from 'dotenv';
import { log } from 'node:console';
import { DataSource } from 'typeorm';

const isTest = process.env.NODE_ENV === 'test';

dotenv.config({ path: isTest ? '.env.test' : '.env' });

const dataSource = new DataSource({
	type: process.env.DATABASE_TYPE as 'mysql',
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	synchronize: true,
});

log('data source', dataSource);

export default dataSource;
