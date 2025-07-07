import { Injectable } from '@nestjs/common';
import { StudentRepository } from '../repositories/StudentRepository';
import { Student } from '../modules/students/student.entity';

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository) {}

  async findByPhone(phone: string): Promise<Student | undefined> {
    return this.studentRepository.findByPhone(phone);
  }

  async findByName(name: string): Promise<Student[]> {
    return this.studentRepository.findByName(name);
  }

  async create(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(studentData);
    return this.studentRepository.save(student);
  }

  async delete(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
