import * as path from 'path';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: '.env' });

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  migrations: [path.join(__dirname, '..') + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
};

export const dataSource = new DataSource(typeOrmConfig);
