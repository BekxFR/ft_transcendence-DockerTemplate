import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test')
export class TestPostEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: ''})
	name: string;

	async setName(name: string): Promise<void> {
		if (name) {
		  this.name = name;
		}
	}
}