import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './enums/role.enum';
import { DailyRecord } from 'src/modules/emotional-record/entities/dailyRecord.entity';
import { TranscendentalRecord } from '../../emotional-record/entities/trascandentalRecord.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 50, name: 'first_name' })
  firstName: string;

  @Column({ length: 50, name: 'last_name' })
  lastName: string;

  @Column({ length: 256, unique: true })
  email: string;

  @Column({ length: 15, unique: true, name: 'mobile_number' })
  mobileNumber: string;

  @Column({ length: 256 })
  password: string;

  @Column({ type: 'date', name: 'birth_date' })
  birthDate: Date;

  @OneToMany(() => DailyRecord, (dailyRecord) => dailyRecord.user)
  dailyRecords: DailyRecord[];

  @OneToMany(
    () => TranscendentalRecord,
    (trascendentalRecord) => trascendentalRecord.user,
  )
  transcendentalRecords: TranscendentalRecord[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
