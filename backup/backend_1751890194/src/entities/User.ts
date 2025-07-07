

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Attendance } from '../modules/attendance/attendance.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column()
  role!: string;

  @Column('simple-array')
  permissions!: string[];

  @OneToMany(() => Attendance, (attendance: Attendance) => attendance.markedBy)
  markedAttendances!: Attendance[];
}

