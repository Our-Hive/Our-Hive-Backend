import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/services/user.service';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, UserService, LocalStrategy],
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
