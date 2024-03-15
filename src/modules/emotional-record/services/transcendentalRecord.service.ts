import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTranscendentalRecordRequestDto } from '../dtos/createTranscendentalRecord.request.dto';
import { TranscendentalRecord } from '../entities/transcendentalRecord.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrimaryEmotionService } from '../../emotion/services/primaryEmotion.service';

@Injectable()
export class TranscendentalRecordService {
  constructor(
    @InjectRepository(TranscendentalRecord)
    private readonly recordRepository: Repository<TranscendentalRecord>,
    private readonly primaryEmotionService: PrimaryEmotionService,
  ) {}

  async createTranscendentalRecord(
    recordDto: CreateTranscendentalRecordRequestDto,
    userId: number,
  ) {
    try {
      const primaryEmotion = await this.primaryEmotionService.getEmotionByName(
        recordDto.primaryEmotion,
      );

      const secondaryEmotionExists = primaryEmotion.secondaryEmotions.find(
        (secondaryEmotion) =>
          secondaryEmotion.name === recordDto.secondaryEmotion,
      );

      if (!secondaryEmotionExists) {
        throw new BadRequestException(
          `Secondary emotion ${recordDto.secondaryEmotion} is not a valid secondary emotion for primary emotion ${recordDto.primaryEmotion}`,
        );
      }

      const record = await this.recordRepository.save({
        ...recordDto,
        user: userId,
      });

      if (!record) {
        throw new InternalServerErrorException(
          'Error creating transcendental record',
        );
      }

      return record;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTranscendentalRecordsByUserId(
    userId: number,
    page: number = 0,
    limit: number = 10,
  ) {
    try {
      console.log('page, limit', page, limit);

      const records = await this.recordRepository.find({
        where: { user: userId },
        order: { createdAt: 'DESC' },
        skip: page * limit,
        take: limit,
      });

      if (!records) {
        throw new NotFoundException('Transcendental records not found');
      }

      return {
        records,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
