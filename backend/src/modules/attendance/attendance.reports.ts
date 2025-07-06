import { Between, Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { AppDataSource } from '../../data-source';

export class AttendanceReports {
  private repo: Repository<Attendance>;

  constructor() {
    this.repo = AppDataSource.getRepository(Attendance);
  }

  async generateStudentReport(studentId: string, startDate: Date, endDate: Date) {
    return this.repo.find({
      where: {
        studentId,
        date: Between(startDate, endDate)
      },
      order: { date: 'ASC' }
    });
  }

  async generateBatchReport(batchId: string, date: Date) {
    return this.repo.find({ 
      where: { batchId, date },
      relations: ['student']
    });
  }
}
