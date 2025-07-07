
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class FeeStructure {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sportId!: number;

  @Column('jsonb')
  levels!: {
    level: string;
    monthlyFee: number;
    registrationFee: number;
  }[];

  @Column('jsonb', { nullable: true })
  discounts?: {
    type: 'percentage' | 'fixed';
    value: number;
    condition?: string;
  }[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
