import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { SignupRequestDto } from '../../user/dtos/signup.request.dto';
import { hash } from 'bcrypt';
import { SignupResponseDto } from '../../user/dtos/signup.response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(signupDto: SignupRequestDto): Promise<SignupResponseDto> {
    const emailExists = await this.userService.getUserByEmail(signupDto.email);

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const usernameExists = await this.userService.getUserByUsername(
      signupDto.username,
    );

    if (usernameExists) {
      throw new ConflictException('Username already exists');
    }

    const encryptedPassword = await hash(signupDto.password, 10);

    // Replace the password with the encrypted password
    signupDto.password = encryptedPassword;

    const createdUser = await this.userService.createUser(signupDto);

    return {
      id: createdUser.id,
      username: createdUser.username,
      email: createdUser.email,
    };
  }
}
