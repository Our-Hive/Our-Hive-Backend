import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/services/user.service';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/configs/configuration';
import { ConfigType } from '@nestjs/config';

@Module({
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [configuration.KEY],
      useFactory: async (configService: ConfigType<typeof configuration>) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
