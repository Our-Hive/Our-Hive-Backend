import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './configs/dbConfig';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV || '.env',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
