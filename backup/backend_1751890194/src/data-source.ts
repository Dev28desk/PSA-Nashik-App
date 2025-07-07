


import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Student } from '/workspace/parmanand-sports-academy/backend/src/modules/students/student.model';
import { Batch } from '/workspace/parmanand-sports-academy/backend/src/modules/batches/batch.model';
import { User } from '/workspace/parmanand-sports-academy/backend/src/modules/users/user.model';
import { Attendance } from '/workspace/parmanand-sports-academy/backend/src/modules/attendance/attendance.model';
import { FeeStructure } from '/workspace/parmanand-sports-academy/backend/src/modules/fees/fees.model';

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
  entities: [Student, Batch, User, Attendance, FeeStructure],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});


