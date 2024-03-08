import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { UpdateUserRequestDto } from '../dtos/updateUser.request';
import { DeactivateUserRequestDto } from '../dtos/deactivateUser.request';

@UseGuards(JwtAuthGuard)
@ApiTags('User')
@ApiBearerAuth('JWT')
@Controller('users')
@ApiHeader({ name: 'Authorization', description: 'Auth token' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get logged user info' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Get()
  async getUser(@Req() req: Request) {
    const { sub } = req.user as PayloadToken;

    return this.userService.getUserById(sub);
  }

  @ApiOperation({ summary: 'Update logged user info' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Patch()
  async updateUser(
    @Req() req: Request,
    @Body() updateUserData: UpdateUserRequestDto,
  ) {
    const { sub } = req.user as PayloadToken;

    return this.userService.updateUser(sub, updateUserData);
  }

  @ApiOperation({ summary: 'Deactivate logged user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deactivated',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async deactivateUser(
    @Req() req: Request,
    @Body() deactivateUserData: DeactivateUserRequestDto,
  ) {
    const { sub } = req.user as PayloadToken;

    return this.userService.deactivateUser(sub, deactivateUserData);
  }
}
