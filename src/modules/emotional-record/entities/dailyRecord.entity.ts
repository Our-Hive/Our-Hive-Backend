import { SecondaryEmotion } from 'src/modules/emotion/entities/secondaryEmotion.entity';
import { PrimaryEmotion } from '../../emotion/entities/primaryEmotion.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('daily_records')
export class DailyRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PrimaryEmotion, (primaryEmotion) => primaryEmotion.name)
  primaryEmotion: string;

  @ManyToOne(
    () => SecondaryEmotion,
    (secondaryEmotion) => secondaryEmotion.dailyRecords,
  )
  secondaryEmotion: string;

  @Column('varchar', { length: 255 })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
