

import { Student } from '../entities/Student';
import { StudentRepository } from '../repositories/StudentRepository';
import { AppDataSource } from '../data-source';

export class StudentService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = AppDataSource.getRepository(Student);
  }

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(studentData);
    return this.studentRepository.save(student);
  }

  async getStudentById(id: number): Promise<Student | null> {
    return this.studentRepository.findOneBy({ id });
  }

  async updateStudent(id: number, updateData: Partial<Student>): Promise<Student | null> {
    await this.studentRepository.update(id, updateData);
    return this.getStudentById(id);
  }

  async deleteStudent(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}

