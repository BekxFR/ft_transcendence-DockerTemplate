import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
// import { Pool } from 'pg';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!!';
  }
}

// @Injectable()
// export class UserService {
//   private pool: Pool;

//   constructor() {
//     this.pool = new Pool({
//       host: 'localhost',
//       port: 5432,
//       user: 'postgres',
//       password: 'postgresmdp',
//       database: 'mypostgres',
//     });
//   }

//   async findAll(): Promise<User[]> {
//     const query = 'SELECT * FROM users';
//     const result = await this.pool.query(query);
//     return result.rows;
//   }

//   // Autres méthodes pour interagir avec la base de données
// }
