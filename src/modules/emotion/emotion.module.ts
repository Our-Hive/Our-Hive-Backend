import { Module } from '@nestjs/common';
import { PrimaryEmotionService } from './services/primaryEmotion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimaryEmotion } from './entities/primaryEmotion.entity';
import { EmotionController } from './controllers/emotion.controller';
import { SecondaryEmotionService } from './services/secondaryEmotion.service';
import { SecondaryEmotion } from './entities/secondaryEmotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrimaryEmotion, SecondaryEmotion])],
  providers: [PrimaryEmotionService, SecondaryEmotionService],
  controllers: [EmotionController],
})
export class EmotionModule {}
