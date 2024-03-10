import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PrimaryEmotion } from '../entities/primaryEmotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePrimaryEmotionRequest } from '../dtos/createPrimaryEmotion.request';

@Injectable()
export class PrimaryEmotionService {
  constructor(
    @InjectRepository(PrimaryEmotion)
    private readonly emotionRepository: Repository<PrimaryEmotion>,
  ) {}

  async getEmotions() {
    try {
      return await this.emotionRepository.find();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getEmotionByName(name: string) {
    try {
      name = name.toLowerCase();
      const emotion = await this.emotionRepository.findOne({
        where: { name },
        select: { name: true, description: true },
        relations: ['secondaryEmotions'],
      });

      if (!emotion) {
        throw new NotFoundException(`Emotion ${name} not found`);
      }

      return emotion;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createPrimaryEmotion(emotion: CreatePrimaryEmotionRequest) {
    try {
      emotion.name = emotion.name.toLowerCase();

      for (const secondaryEmotion of emotion.secondaryEmotions) {
        secondaryEmotion.name = secondaryEmotion.name.toLowerCase();
      }

      const createdEmotion = await this.emotionRepository.save(emotion);

      if (!createdEmotion) {
        throw new InternalServerErrorException('Error creating emotion');
      }

      return createdEmotion;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
