


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sport } from '../sports/sport.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ unique: true, nullable: false })
  phone!: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @ManyToOne(() => Sport, (sport) => sport.students, { nullable: false })
  @JoinColumn({ name: 'sport_id' })
  sport!: Sport;

  @Column({ name: 'batch_id', nullable: false })
  batchId!: number;

  @Column({ type: 'date', name: 'joining_date' })
  joiningDate!: Date;
}


