
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../students/student.entity';

@Entity('sports')
export class Sport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  name!: string;

  @Column({ type: 'jsonb', nullable: true })
  feeStructure?: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  skillLevels?: Record<string, any>;

  @OneToMany(() => Student, (student: Student) => student.sport)
  students!: Student[];
}
