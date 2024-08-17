import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tenant } from './tenant.entity';
import { CreateTenantDto } from './dto';
import { getTenantConnection } from 'src/modules/tenancy/tenancy.utilts';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant) private readonly tenantRepo: Repository<Tenant>,
    private readonly databaseService: DatabaseService,
  ) {}

  async create(data: CreateTenantDto): Promise<Tenant> {
    let tenant = this.tenantRepo.create({
      name: data.name,
    });

    tenant = await this.tenantRepo.save(tenant);

    const sanitizedTenantId = tenant.id.replace(/-/g, '_');
    const schemaName = `tenant_${sanitizedTenantId}`;
    console.log('HI9');
    await this.databaseService.defaultDataSource.query(
      `CREATE SCHEMA IF NOT EXISTS ${schemaName}`,
    );

    // Use the sanitized schema name when getting the tenant connection
    console.log('HI');
    const tenantDataSource = await getTenantConnection(schemaName);
    console.log('HERREEEE');
    // await tenantDataSource.initialize();
    await tenantDataSource.runMigrations();
    await tenantDataSource.destroy();

    return tenant;
  }

  async findAll(): Promise<Tenant[]> {
    return await this.tenantRepo.find();
  }
}
