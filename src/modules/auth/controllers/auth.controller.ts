import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignupRequestDto } from '../../user/dtos/signup.request.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '../../user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignupRequestDto })
  @Post('onboarding')
  @Post('signup')
  async signup(@Body() signupDto: SignupRequestDto) {
    return await this.authService.signup(signupDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.generateJwt(req.user as User);
  }
}
