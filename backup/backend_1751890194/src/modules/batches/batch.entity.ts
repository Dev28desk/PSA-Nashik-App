import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Batch {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  name!: string;
  
  @Column()
  schedule!: string;
  
  @Column({ nullable: true })
  coachNotes?: string;
}
