import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { PrimaryEmotion } from './primaryEmotion.entity';
import { Theme } from './enums/theme.enum';

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
  primaryEmotion: PrimaryEmotion;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
