import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sport } from './sport.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  phone!: string;

  @ManyToOne(() => Sport, { eager: true })
  @JoinColumn({ name: 'sportId' })
  sport!: Sport;

  @Column()
  sportId!: number;
}
