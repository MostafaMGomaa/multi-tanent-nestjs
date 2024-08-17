import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres', // TypeORM expects a specific value here, not just a string
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456789',
  database: 'multitenant',
  logging: true,
  entities: [join(__dirname, './modules/public/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
  synchronize: true,
};

export default ormConfig;
