


import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Attendance } from '../attendance/attendance.model';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column()
  sportId: number;

  @Column()
  batchId: number;

  @Column({ type: 'date' })
  joiningDate: Date;

  @OneToMany(() => Attendance, attendance => attendance.student)
  attendances: Attendance[];
}


