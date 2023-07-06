import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { TestController } from './test.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test.module';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { PostService } from './post.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}),
			TypeOrmModule.forRoot({
			  type: 'postgres',
			  host: process.env.POSTGRES_HOST,
			  port: parseInt(<string>process.env.POSTGRES_PORT),
			  username: process.env.POSTGRES_USER,
			  password: process.env.POSTGRES_PASSWORD,
			  database: process.env.POSTGRES_DB,
			  autoLoadEntities: true,
			  synchronize: true,
			}),
			TestModule
			],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, PostService],
})
export class AppModule {}
