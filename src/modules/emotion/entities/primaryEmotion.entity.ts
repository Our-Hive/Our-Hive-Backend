import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { SecondaryEmotion } from './secondaryEmotion.entity';

@Entity({ name: 'primary_emotions' })
export class PrimaryEmotion {
  @Column({ primary: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => SecondaryEmotion,
    (secondaryEmotion) => secondaryEmotion.primaryEmotion,
  )
  secondaryEmotions: SecondaryEmotion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
