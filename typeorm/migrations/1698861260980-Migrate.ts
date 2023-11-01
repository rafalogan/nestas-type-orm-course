import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrate1698861260980 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{ name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment', unsigned: true },
					{ name: 'name', type: 'varchar', length: '155' },
					{ name: 'email', type: 'varchar', length: '155', isUnique: true },
					{ name: 'password', type: 'varchar', length: '155' },
					{ name: 'birthAt', type: 'timestamp', isNull: true },
					{ name: 'active', type: 'boolean', default: true },
					{ name: 'rule', type: 'integer', default: '1' },
					{ name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP()' },
					{ name: 'updatedAt', type: 'timestamp', isNull: true },
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.dropTable('uesrs');
	}
}
