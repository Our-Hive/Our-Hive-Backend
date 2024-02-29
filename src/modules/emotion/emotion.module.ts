import { Module } from '@nestjs/common';
import { PrimaryEmotionService } from './services/primaryEmotion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimaryEmotion } from './entities/primaryEmotion.entity';
import { EmotionController } from './controllers/emotion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PrimaryEmotion])],
  providers: [PrimaryEmotionService],
  controllers: [EmotionController],
})
export class EmotionModule {}
