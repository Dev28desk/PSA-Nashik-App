
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Attendance } from '../attendance/attendance.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  phone!: string;

  @Column()
  role!: string; // 'admin', 'coach', 'staff'

  @Column({ type: 'json' })
  permissions!: string[];

  @OneToMany(() => Attendance, attendance => attendance.markedBy)
  markedAttendances!: Attendance[];
}
