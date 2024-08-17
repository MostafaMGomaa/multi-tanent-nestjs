import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './orm.config';
import { DatabaseService } from './database.service';
import { AppService } from './app.service';
import { TenantsModule } from './modules/public/tenants/tenants.module';
import { CatsModule } from './modules/tenanted/cats/cats.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TenantsModule,
    TenancyModule,
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
  exports: [DatabaseService],
})
export class AppModule {}
