import { EntityRepository, Repository } from 'typeorm';
import { Student } from '../modules/students/student.entity';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async findByPhone(phone: string): Promise<Student | undefined> {
    return this.findOne({ 
      where: { phone },
      relations: ['sport']
    });
  }

  async findByName(name: string): Promise<Student[]> {
    return this.find({ 
      where: { name },
      relations: ['sport']
    });
  }
}
