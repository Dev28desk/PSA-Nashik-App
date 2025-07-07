


import { DataSource } from 'typeorm';
import { Student } from '../modules/students/student.entity';
import { Sport } from '../modules/sports/sport.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'sports_academy',
  entities: [Student, Sport],
  migrations: ['src/migrations/*.ts'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
});

export const initializeDatabase = async () => {
  return AppDataSource.initialize();
};


