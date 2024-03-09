import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { SecondaryEmotion } from './secondaryEmotion.entity';
import { DailyRecord } from 'src/modules/emotional-record/entities/daily-record.entity';

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

  @OneToMany(() => DailyRecord, (dailyRecord) => dailyRecord.primaryEmotion, {
    cascade: true,
  })
  dailyRecords: DailyRecord[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
