import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignupRequestDto } from '../../auth/dtos/signup.request.dto';
import { UpdateUserRequestDto } from '../dtos/updateUser.request';
import { UpdateUserResponseDto } from '../dtos/updateUser.response';
import { compare, hash } from 'bcrypt';
import { DeactivateUserRequestDto } from '../dtos/deactivateUser.request';
import { UserRole } from '../entities/enums/role.enum';

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

  async updateUser(
    id: number,
    newUser: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    try {
      const oldUser = await this.userRepository.findOne({
        where: { id },
      });

      if (!oldUser) {
        throw new NotFoundException('User not found');
      }

      Object.assign(oldUser, newUser);

      const { username, email, mobileNumber, birthDate } =
        await this.userRepository.save(oldUser);

      return {
        username: username,
        email: email,
        mobileNumber: mobileNumber,
        birthdate: birthDate,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deactivateUser(id: number, loggedUser: DeactivateUserRequestDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await compare(loggedUser.password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      const result = await this.userRepository.softDelete(id);

      if (result.affected === 0) {
        throw new InternalServerErrorException('Error deactivating user');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async ensureAdminExists() {
    try {
      const admin = await this.userRepository.findOne({
        where: { role: UserRole.ADMIN },
      });

      if (admin) {
        return true;
      }

      const password = await hash('admin', 10);

      await this.userRepository.save({
        username: 'admin',
        firstName: 'Admin',
        lastName: 'Admin',
        role: UserRole.ADMIN,
        email: 'admin@email.com',
        birthDate: new Date('1990-01-01'),
        mobileNumber: '+573111111111',
        password,
      });

      return false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
