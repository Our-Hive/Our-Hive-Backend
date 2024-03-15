import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { SecondaryEmotion } from './secondaryEmotion.entity';
import { DailyRecord } from '../../emotional-record/entities/dailyRecord.entity';
import { TranscendentalRecord } from '../../emotional-record/entities/trascandentalRecord.entity';

@Entity({ name: 'primary_emotions' })
export class PrimaryEmotion {
  @Column({ primary: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => SecondaryEmotion,
    (secondaryEmotion) => secondaryEmotion.primaryEmotion,
    {
      cascade: true,
    },
  )
  secondaryEmotions: SecondaryEmotion[];

  @OneToMany(() => DailyRecord, (dailyRecord) => dailyRecord.primaryEmotion)
  dailyRecords: DailyRecord[];

  @OneToMany(
    () => TranscendentalRecord,
    (trascendentalRecord) => trascendentalRecord.primaryEmotion,
  )
  transcendentalRecords: TranscendentalRecord[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
