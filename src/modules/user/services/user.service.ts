import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignupRequestDto } from '../../auth/dtos/signup.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        select: { username: true, email: true },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = await this.userRepository.findOne({ where: { username } });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserByMobileNumber(mobileNumber: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { mobileNumber },
      });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createUser(user: SignupRequestDto) {
    try {
      const newUser = await this.userRepository.save(user);

      if (!newUser) {
        throw new InternalServerErrorException('Error creating user');
      }

      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
