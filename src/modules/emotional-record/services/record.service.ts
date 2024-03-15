import { Injectable } from '@nestjs/common';
import { DailyRecordService } from './dailyRecord.service';
import { TranscendentalRecordService } from './transcendentalRecord.service';
import { EmotionalRecord } from '../dtos/getRecord.response.dto';

@Injectable()
export class RecordService {
  constructor(
    private readonly dailyService: DailyRecordService,
    private readonly transcendentalService: TranscendentalRecordService,
  ) {}

  async getAllRecordsByUserId(
    userId: number,
    page: number = 0,
    limit: number = 10,
  ) {
    try {
      const fixedLimit = Math.floor(limit / 2);

      const dailyRecords = await this.dailyService.getDailyRecordsByUserId(
        userId,
        page,
        fixedLimit,
      );
      const transcendentalRecords =
        await this.transcendentalService.getTranscendentalRecordsByUserId(
          userId,
          page,
          fixedLimit,
        );

      const records = this.sortRecords([
        ...transcendentalRecords,
        ...dailyRecords,
      ]);

      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private sortRecords(records: EmotionalRecord[]): EmotionalRecord[] {
    return records.sort((record1, record2) => {
      return (
        new Date(record2.createdAt).getTime() -
        new Date(record1.createdAt).getTime()
      );
    });
  }
}
