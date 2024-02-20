import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { SignupRequestDto } from '../dtos/signup.request.dto';
import { hash, compare } from 'bcrypt';
import { SignupResponseDto } from '../dtos/signup.response.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../dtos/login.response.dto';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupRequestDto): Promise<SignupResponseDto> {
    await this.validateUserFields(signupDto);

    const encryptedPassword = await hash(signupDto.password, 10);

    // Replace the password with the encrypted password
    signupDto.password = encryptedPassword;

    const createdUser = await this.userService.createUser(signupDto);

    return {
      id: createdUser.id,
      username: createdUser.username,
      email: createdUser.email,
      access_token: this.generateJwt(createdUser).access_token,
    };
  }

  async validateUserFields(signupDto: SignupRequestDto): Promise<void> {
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

    const mobileNumberExists = await this.userService.getUserByMobileNumber(
      signupDto.mobileNumber,
    );

    if (mobileNumberExists) {
      throw new ConflictException('Mobile number already exists');
    }
  }

  generateJwt(user: User): LoginResponseDto {
    const payload: PayloadToken = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
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
