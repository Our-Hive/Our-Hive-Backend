import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignupRequestDto } from '../../user/dtos/signup.request.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

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
}
