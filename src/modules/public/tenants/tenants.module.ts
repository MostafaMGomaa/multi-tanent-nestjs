import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { DataSource } from 'typeorm';
import { DatabaseService } from 'src/database.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [TenantsService, DatabaseService],
  exports: [TenantsService],
  controllers: [TenantsController],
})
export class TenantsModule {}
