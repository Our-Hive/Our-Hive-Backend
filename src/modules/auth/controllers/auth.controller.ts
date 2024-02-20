import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignupRequestDto } from '../dtos/signup.request.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '../../user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { LoginRequestDto } from '../dtos/login.request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignupRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Signup successful',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email, Username or Mobile Number already exists',
  })
  @Post('signup')
  async signup(@Body() signupDto: SignupRequestDto) {
    return await this.authService.signup(signupDto);
  }

  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Req() req: Request) {
    return this.authService.generateJwt(req.user as User);
  }
}
