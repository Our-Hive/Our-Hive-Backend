import { Controller, Get, Param } from '@nestjs/common';
import { PrimaryEmotionService } from '../services/primaryEmotion.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('emotions')
@Controller('emotions')
export class EmotionController {
  constructor(private readonly primaryEmotionService: PrimaryEmotionService) {}

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
    status: 200,
    description: 'The primary emotion has been successfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'The primary emotion was not found',
  })
  @Get('/primary/:name')
  async getPrimaryEmotionByName(@Param('name') name: string) {
    return await this.primaryEmotionService.getEmotionByName(name);
  }

  // @ApiOperation({ summary: 'Create a primary emotion' })
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   description: 'The primary emotion has been successfully created',
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   description: 'The request is invalid',
  // })
  // @HttpCode(HttpStatus.CREATED)
  // @Post()
  // async createEmotion(@Body() body: CreatePrimaryEmotionRequest) {
  //   return await this.primaryEmotionService.createEmotion(body);
  // }
}
