import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
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

@UseGuards(JwtAuthGuard)
@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get logged user info' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @Get()
  async getUserById(@Req() req: Request) {
    const { sub } = req.user as PayloadToken;

    return this.userService.getUserById(sub);
  }

  @ApiOperation({ summary: 'Update logged user info' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @Patch()
  async updateUser(
    @Req() req: Request,
    @Body() updateUserData: UpdateUserRequestDto,
  ) {
    const { sub } = req.user as PayloadToken;

    return this.userService.updateUser(sub, updateUserData);
  }
}
