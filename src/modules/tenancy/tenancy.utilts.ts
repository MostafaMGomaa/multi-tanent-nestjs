import tenantsOrmConfig from 'src/tenants-orm.config';
import {
  Connection,
  getConnectionManager,
  createConnection,
  DataSource,
} from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Cat } from '../tenanted/cats/cat.entity';

export function getTenantConnection(tenantId: string): Promise<DataSource> {
  console.log({ schemaName: tenantId });
  const sanitizedTenantId = tenantId.replace(/-/g, '_');
  console.log({ sanitizedTenantId });

  const connectionName = sanitizedTenantId.startsWith('tenant_')
    ? sanitizedTenantId
    : `tenant_${sanitizedTenantId}`;

  const tenantDataSource = new DataSource({
    ...(tenantsOrmConfig as PostgresConnectionOptions),
    name: connectionName,
    schema: connectionName,
    entities: [Cat],
  });
  console.log(tenantDataSource.entityMetadatas);
  return tenantDataSource.initialize();
}

/**
 * @deprecated
 */
export function getTenantConnectionOld(tenantId: string): Promise<Connection> {
  const connectionName = `tenant_${tenantId}`;
  const connectionManger = getConnectionManager();

  if (connectionManger.has(connectionName)) {
    const connection = connectionManger.get(connectionName);
    return Promise.resolve(
      connection.isConnected ? connection : connection.connect(),
    );
  }

  return createConnection({
    ...(tenantsOrmConfig as PostgresConnectionOptions),
    name: connectionName,
    schema: connectionName,
  });
}
