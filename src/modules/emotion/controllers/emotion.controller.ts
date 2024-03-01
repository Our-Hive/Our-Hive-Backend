import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PrimaryEmotionService } from '../services/primaryEmotion.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePrimaryEmotionRequest } from '../dtos/createPrimaryEmotion.request';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { Roles } from 'src/modules/auth/decorators/role.decorator';
import { UserRole } from 'src/modules/user/entities/enums/role.enum';
import { SecondaryEmotionService } from '../services/secondaryEmotion.service';
import { CreateSecondaryEmotionRequest } from '../dtos/createSecondaryEmotion.request';

@ApiTags('emotions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('emotions')
export class EmotionController {
  constructor(
    private readonly primaryEmotionService: PrimaryEmotionService,
    private readonly secondaryEmotionService: SecondaryEmotionService,
  ) {}

  @ApiOperation({ summary: 'Get all primary emotions' })
  @ApiResponse({
    status: 200,
    description: 'The primary emotions have been successfully retrieved',
  })
  @Get('/primary')
  async getPrimaryEmotions() {
    return await this.primaryEmotionService.getEmotions();
  }

  @ApiOperation({ summary: 'Get a primary emotion by name' })
  @ApiParam({
    name: 'name',
    required: true,
    example: 'Happy',
    description: 'The name of the primary emotion',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The primary emotion has been successfully retrieved',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The primary emotion was not found',
  })
  @Get('/primary/:name')
  async getPrimaryEmotionByName(@Param('name') name: string) {
    return await this.primaryEmotionService.getEmotionByName(name);
  }

  @ApiOperation({ summary: 'Create a primary emotion' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The primary emotion has been successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request is invalid',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/primary')
  @Roles(UserRole.ADMIN)
  async createPrimaryEmotion(@Body() body: CreatePrimaryEmotionRequest) {
    return await this.primaryEmotionService.createPrimaryEmotion(body);
  }

  @ApiOperation({ summary: 'Create a secondary emotion' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The secondary emotion has been successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request is invalid',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/secondary')
  @Roles(UserRole.ADMIN)
  async createSecondaryEmotion(@Body() body: CreateSecondaryEmotionRequest) {
    return await this.secondaryEmotionService.createSecondaryEmotion(body);
  }
}
