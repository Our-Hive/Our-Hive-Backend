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
import { CreateTranscendentalRecordRequestDto } from '../dtos/createTranscendentalRecord.request.dto';
import { TranscendentalRecordService } from '../services/transcendentalRecord.service';
import { RecordService } from '../services/record.service';

@ApiTags('emotional records')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@ApiHeader({ name: 'Authorization', description: 'Auth token' })
@Controller('emotional-records')
export class EmotionalRecordController {
  constructor(
    private readonly recordService: RecordService,
    private readonly dailyService: DailyRecordService,
    private readonly transcendentalService: TranscendentalRecordService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all records' })
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
  @ApiResponse({ status: HttpStatus.OK, description: 'Records found' })
  async getAllRecords(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const { sub } = req.user as PayloadToken;

    return await this.recordService.getAllRecordsByUserId(sub, page, limit);
  }

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

    return await this.dailyService.createDailyRecord(dailyRecord, sub);
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
  async getDailyRecords(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const { sub } = req.user as PayloadToken;

    return await this.dailyService.getDailyRecordsByUserId(sub, page, limit);
  }

  @Post('transcendental')
  @ApiOperation({ summary: 'Create transcendental record' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Transcendental record created',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Primary emotion not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid secondary emotion for primary emotion',
  })
  @HttpCode(HttpStatus.CREATED)
  async createTranscendentalRecord(
    @Req() req: Request,
    @Body() transcendentalRecord: CreateTranscendentalRecordRequestDto,
  ) {
    const { sub } = req.user as PayloadToken;

    return await this.transcendentalService.createTranscendentalRecord(
      transcendentalRecord,
      sub,
    );
  }

  @Get('transcendental')
  @ApiOperation({ summary: 'Get transcendental records' })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transcendental records found',
  })
  async getTranscendentalRecords(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const { sub } = req.user as PayloadToken;

    return await this.transcendentalService.getTranscendentalRecordsByUserId(
      sub,
      page,
      limit,
    );
  }
}
