import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { DatabaseService } from 'src/database.service';

@Module({
  controllers: [CatsController],
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatsService, DatabaseService],
  exports: [DatabaseService],
})
export class CatsModule {}
