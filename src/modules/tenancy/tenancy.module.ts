import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';
import { getTenantConnection } from 'src/modules/tenancy';
import { DataSource } from 'typeorm';

const connectionFactory = {
  provide: DataSource,
  scope: Scope.REQUEST,
  useFactory: (request: ExpressRequest) => {
    const { tenantId } = request;

    if (tenantId) {
      const sanitizedTenantId = tenantId.replace(/-/g, '_');
      return getTenantConnection(sanitizedTenantId);
    }

    return null;
  },
  Inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: [DataSource],
})
export class TenancyModule {}
