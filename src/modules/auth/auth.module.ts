import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/services/user.service';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';

@Module({
  providers: [AuthService, UserService],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
})
export class AuthModule {}
