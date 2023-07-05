import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestPostEntity } from './test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestPostEntity])
  ],
  providers: [TestService],
  controllers: [TestController]
})
export class TestModule {}
