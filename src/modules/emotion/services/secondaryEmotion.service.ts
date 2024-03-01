import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SecondaryEmotion } from '../entities/secondaryEmotion.entity';
import { Repository } from 'typeorm';
import { CreateSecondaryEmotionRequest } from '../dtos/createSecondaryEmotion.request';

@Injectable()
export class SecondaryEmotionService {
  constructor(
    @InjectRepository(SecondaryEmotion)
    private readonly emotionRepository: Repository<SecondaryEmotion>,
  ) {}

  async createSecondaryEmotion(emotion: CreateSecondaryEmotionRequest) {
    try {
      emotion.name = emotion.name.toLowerCase();
      emotion.primaryEmotion = emotion.primaryEmotion.toLowerCase();
      const savedEmotion = await this.emotionRepository.save(emotion);

      if (!savedEmotion) {
        throw new InternalServerErrorException('Error creating emotion');
      }

      return savedEmotion;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
