
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  photoUrl!: string;

  @Column()
  sportId!: number;

  @Column()
  batchId!: number;

  @Column()
  joiningDate!: Date;
}
