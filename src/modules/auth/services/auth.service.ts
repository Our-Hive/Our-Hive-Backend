import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { SignupRequestDto } from '../../user/dtos/signup.request.dto';
import { hash, compare } from 'bcrypt';
import { SignupResponseDto } from '../../user/dtos/signup.response.dto';
import { User } from 'src/modules/user/entities/user.entity';

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

  generateJwt(user: User) {
    return { message: 'Login Works', user };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
