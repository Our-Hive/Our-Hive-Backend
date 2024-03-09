import { Module } from '@nestjs/common';
import { DailyRecordService } from './services/dailyRecord.service';
import { DailyRecord } from './entities/dailyRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DailyRecord])],
  providers: [DailyRecordService],
})
export class EmotionalRecordModule {}
