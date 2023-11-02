import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn({ unsigned: true })
	id: number;

	@Column({ length: 155 })
	name: string;

	@Column({ unique: true, length: 155 })
	email: string;

	@Column({ length: 155 })
	password: string;

	@Column({ type: 'timestamp', nullable: true })
	birthAt?: Date;

	@Column({ default: true })
	active: boolean;

	@Column({ default: 1 })
	rule?: number;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt?: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt?: Date;
}
