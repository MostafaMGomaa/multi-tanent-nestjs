import { join } from 'path';
import ormConfig from './orm.config';

export default {
  ...ormConfig,
  entities: [join(__dirname, './modules/tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/tenanted/*{.ts,.js}')],
};
