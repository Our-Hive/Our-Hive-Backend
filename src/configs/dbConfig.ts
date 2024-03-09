import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './datasourceOptions';

export function getDatabaseConfig(): TypeOrmModuleOptions {
  return typeOrmConfig;
}
