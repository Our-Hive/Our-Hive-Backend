import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DailyRecordService } from '../services/dailyRecord.service';
import { CreateDailyRecordRequest } from '../dtos/createDailyRecord.request.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';

@ApiTags('emotional records')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@ApiHeader({ name: 'Authorization', description: 'Auth token' })
@Controller('emotional-records')
export class EmotionalRecordController {
  constructor(private readonly dailyRecord: DailyRecordService) {}

  @ApiOperation({ summary: 'Create daily record' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Daily record created',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Primary emotion not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid secondary emotion for primary emotion',
  })
  @Post('daily')
  @HttpCode(HttpStatus.CREATED)
  async createDailyRecord(
    @Req() req: Request,
    @Body() dailyRecord: CreateDailyRecordRequest,
  ) {
    const { sub } = req.user as PayloadToken;

    return await this.dailyRecord.createDailyRecord(dailyRecord, sub);
  }

  @Get('daily')
  @ApiOperation({ summary: 'Get daily records' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number, default value 0',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit of records per page, default value 10',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Daily records found' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Daily records not found',
  })
  async getDailyRecords(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const { sub } = req.user as PayloadToken;

    return await this.dailyRecord.getDailyRecordsByUserId(sub, page, limit);
  }
}
