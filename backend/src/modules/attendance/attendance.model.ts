


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../students/student.model';
import { Batch } from '../batches/batch.model';
import { User } from '../users/user.model';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Student, student => student.attendances)
  student!: Student;

  @ManyToOne(() => Batch, batch => batch.attendances)
  batch!: Batch;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ default: false })
  present!: boolean;

  @ManyToOne(() => User, user => user.markedAttendances)
  markedBy!: User;

  @Column({ type: 'json', nullable: true })
  locationData!: { lat: number; lng: number; timestamp: Date };
}


