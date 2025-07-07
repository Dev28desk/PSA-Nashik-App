import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { StudentRepository } from '../../repositories/StudentRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [
    StudentService,
    {
      provide: 'StudentRepository',
      useClass: StudentRepository
    }
  ],
  exports: [StudentService]
})
export class StudentModule {}
