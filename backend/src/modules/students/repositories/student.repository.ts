
import { DataSource, Repository } from 'typeorm';
import { Student } from '../student.model';

export class StudentRepository extends Repository<Student> {
  constructor(private dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }
  async findBySport(sportId: number): Promise<Student[]> {
    return this.createQueryBuilder('student')
      .where('student.sportId = :sportId', { sportId })
      .getMany();
  }

  async findWithActivePayments(): Promise<Student[]> {
    return this.createQueryBuilder('student')
      .leftJoinAndSelect('student.payments', 'payment')
      .where('payment.status = :status', { status: 'active' })
      .getMany();
  }
}
