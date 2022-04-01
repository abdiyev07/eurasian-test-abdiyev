import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { postgreConfig } from './src/config/database.config';
import * as path from 'path';
const typeOrmEntitiesPath = path.join(path.resolve(), 'dist', 'src', 'common', 'entities', '*.entity.js');
const postgresMigrationsPath = path.join(path.resolve(), 'dist', 'src', 'migrations', 'postgres', '*.js');

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: postgreConfig.host,
  port: postgreConfig.port,
  username: postgreConfig.username,
  password: postgreConfig.password,
  database: postgreConfig.database,
  entities: [typeOrmEntitiesPath],
  migrations: [postgresMigrationsPath],
  cli: {
    migrationsDir: path.join(path.resolve(), 'src', 'migrations', 'postgres'),
  },
  synchronize: false,
  schema: 'public',
};

export default config;
