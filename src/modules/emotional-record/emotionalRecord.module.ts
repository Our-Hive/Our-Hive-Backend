import { Module } from '@nestjs/common';
import { DailyRecordService } from './services/dailyRecord.service';
import { DailyRecord } from './entities/dailyRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimaryEmotionService } from '../emotion/services/primaryEmotion.service';
import { PrimaryEmotion } from '../emotion/entities/primaryEmotion.entity';
import { EmotionalRecordController } from './controllers/emotionalRecord.controller';
import { TranscendentalRecordService } from './services/transcendentalRecord.service';
import { TranscendentalRecord } from './entities/transcendentalRecord.entity';
import { RecordService } from './services/record.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DailyRecord,
      PrimaryEmotion,
      TranscendentalRecord,
    ]),
  ],
  providers: [
    RecordService,
    DailyRecordService,
    PrimaryEmotionService,
    TranscendentalRecordService,
  ],
  controllers: [EmotionalRecordController],
})
export class EmotionalRecordModule {}
