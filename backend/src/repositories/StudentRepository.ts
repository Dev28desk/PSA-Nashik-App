import { EntityRepository, Repository } from 'typeorm';
import { Student } from '../entities/Student';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async findByPhone(phone: string): Promise<Student | undefined> {
    return this.findOne({ where: { phone } });
  }

  async findByName(name: string): Promise<Student[]> {
    return this.find({ where: { name } });
  }
}
