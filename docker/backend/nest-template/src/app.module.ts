import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TestController } from './test.controller';
import { AppService } from './app.service';
import { Pool } from 'pg';

@Module({
  imports: [],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {
	constructor() {
		const pool = new Pool({
			host: 'localhost',
			port: 5432,
			user: 'postgres',
			password: 'postgresmdp',
			database: 'mypostgres',
		});

		pool.connect()
			.then(() => {
			  // Connexion établie avec succès
			})
			.catch(error => {
			  // Erreur de connexion
			});
	}
}
