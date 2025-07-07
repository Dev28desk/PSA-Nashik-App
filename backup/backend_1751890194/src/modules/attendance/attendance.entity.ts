import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../students/student.entity';
import { Batch } from '../batches/batch.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Student)
  student!: Student;

  @ManyToOne(() => Batch)
  batch!: Batch;

  @Column()
  date!: Date;

  @Column()
  present!: boolean;

  @Column({ type: 'json', nullable: true })
  location?: { lat: number; lng: number; timestamp: Date };
}
