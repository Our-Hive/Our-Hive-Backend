import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrimaryEmotion } from '../../emotion/entities/primaryEmotion.entity';
import { SecondaryEmotion } from '../../emotion/entities/secondaryEmotion.entity';
import { User } from '../../user/entities/user.entity';

@Entity('transcendental-records')
export class TranscendentalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => PrimaryEmotion,
    (primaryEmotion) => primaryEmotion.transcendentalRecords,
  )
  primaryEmotion: string;

  @ManyToOne(
    () => SecondaryEmotion,
    (secondaryEmotion) => secondaryEmotion.transcendentalRecords,
  )
  secondaryEmotion: string;

  @ManyToOne(() => User, (user) => user.transcendentalRecords)
  user: number;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  location: string;

  @Column({ length: 255 })
  activity: string;

  @Column({ length: 255 })
  companion: string;
}
