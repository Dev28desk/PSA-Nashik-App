


import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Student } from '@modules/students/student.model';
import { Batch } from '@modules/batches/batch.model';
import { User } from '@modules/users/user.model';
import { Attendance } from '@modules/attendance/attendance.model';

// Validate required environment variables
const dbPort = parseInt(process.env.DB_PORT || '5432');
if (isNaN(dbPort)) throw new Error('Invalid DB_PORT');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: dbPort,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'sports_academy',
  synchronize: false,
  logging: true,
  entities: [Student, Batch, User, Attendance],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});


