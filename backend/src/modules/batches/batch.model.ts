


import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Attendance } from '../attendance/attendance.model';

@Entity()
export class Batch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sportId: number;

  @Column()
  schedule: string; // e.g., "Mon/Wed/Fri 4-5PM"

  @Column({ type: 'date' })
  startDate: Date;

  @OneToMany(() => Attendance, attendance => attendance.batch)
  attendances: Attendance[];
}


