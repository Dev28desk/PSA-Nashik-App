


import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../students/student.model';

@Entity()
export class Sport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'jsonb' })
  feeStructure!: Record<string, any>;

  @Column({ type: 'jsonb' })
  skillLevels!: string[];

  @OneToMany(() => Student, student => student.sportId)
  students!: Student[];
}


