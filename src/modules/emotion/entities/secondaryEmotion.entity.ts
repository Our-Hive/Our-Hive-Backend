import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { PrimaryEmotion } from './primaryEmotion.entity';
import { Theme } from './enums/theme.enum';
import { DailyRecord } from 'src/modules/emotional-record/entities/dailyRecord.entity';
import { TranscendentalRecord } from 'src/modules/emotional-record/entities/transcendentalRecord.entity';

@Entity({ name: 'secondary_emotions' })
export class SecondaryEmotion {
  @Column({ primary: true })
  name: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column({
    type: 'enum',
    enum: Theme,
    default: Theme.DARK,
  })
  theme: string;

  @ManyToOne(
    () => PrimaryEmotion,
    (primaryEmotion) => primaryEmotion.secondaryEmotions,
  )
  primaryEmotion: string;

  @OneToMany(() => DailyRecord, (dailyRecord) => dailyRecord.secondaryEmotion)
  dailyRecords: DailyRecord[];

  @OneToMany(
    () => TranscendentalRecord,
    (trascendentalRecord) => trascendentalRecord.secondaryEmotion,
  )
  transcendentalRecords: TranscendentalRecord[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
