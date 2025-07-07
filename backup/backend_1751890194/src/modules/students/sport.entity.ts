import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('jsonb')
  feeStructure!: Record<string, any>;

  @Column('jsonb')
  skillLevels!: Record<string, any>;
}
