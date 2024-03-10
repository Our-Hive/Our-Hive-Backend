import { Module } from '@nestjs/common';
import { DailyRecordService } from './services/dailyRecord.service';
import { DailyRecord } from './entities/dailyRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimaryEmotionService } from '../emotion/services/primaryEmotion.service';
import { PrimaryEmotion } from '../emotion/entities/primaryEmotion.entity';
import { EmotionalRecordController } from './controllers/emotionalRecord.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DailyRecord, PrimaryEmotion])],
  providers: [DailyRecordService, PrimaryEmotionService],
  controllers: [EmotionalRecordController],
})
export class EmotionalRecordModule {}
