import { Module } from '@nestjs/common';
import { DailyRecordService } from './services/dailyRecord.service';

@Module({
  providers: [DailyRecordService]
})
export class EmotionalRecordModule {}
