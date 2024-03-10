import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyRecord } from '../entities/dailyRecord.entity';
import { CreateDailyRecordRequest } from '../dtos/createDailyRecord.request.dto';
import { PrimaryEmotionService } from '../../emotion/services/primaryEmotion.service';

@Injectable()
export class DailyRecordService {
  constructor(
    @InjectRepository(DailyRecord)
    private readonly dailyRecordRepository: Repository<DailyRecord>,
    private readonly primaryEmotionService: PrimaryEmotionService,
  ) {}

  async createDailyRecord(
    dailyRecord: CreateDailyRecordRequest,
    userId: number,
  ) {
    try {
      const primaryEmotion = await this.primaryEmotionService.getEmotionByName(
        dailyRecord.primaryEmotion,
      );

      const secondaryEmotionExists = primaryEmotion.secondaryEmotions.find(
        (secondaryEmotion) =>
          secondaryEmotion.name === dailyRecord.secondaryEmotion,
      );

      if (!secondaryEmotionExists) {
        throw new BadRequestException(
          `Secondary emotion ${dailyRecord.secondaryEmotion} is not a valid secondary emotion for primary emotion ${dailyRecord.primaryEmotion}`,
        );
      }

      const createdDailyRecord = await this.dailyRecordRepository.save({
        ...dailyRecord,
        user: userId,
      });

      if (!createdDailyRecord) {
        throw new InternalServerErrorException('Error creating daily record');
      }

      return createdDailyRecord;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
