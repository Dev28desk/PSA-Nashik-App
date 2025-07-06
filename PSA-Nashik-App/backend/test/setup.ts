


import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../src/modules/students/student.model';
import { Sport } from '../src/modules/sports/sport.model';

export const createTestingModule = async () => {
  return Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.TEST_DB_HOST || 'localhost',
        port: parseInt(process.env.TEST_DB_PORT || '5433'),
        username: process.env.TEST_DB_USER || 'postgres',
        password: process.env.TEST_DB_PASSWORD || 'postgres',
        database: process.env.TEST_DB_NAME || 'test_sports_academy',
        entities: [Student, Sport],
        synchronize: true,
        dropSchema: true,
      }),
      TypeOrmModule.forFeature([Student, Sport]),
    ],
  });
};


