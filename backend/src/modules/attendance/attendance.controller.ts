import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Attendance } from './attendance.entity';
import { Repository } from 'typeorm';

export class AttendanceController {
  constructor(@InjectRepository(Attendance) private repository: Repository<Attendance>) {}

  async markAttendance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId, batchId, present } = req.body;
      const attendance = await this.repository.save({
        student: { id: studentId },
        batch: { id: batchId },
        present,
        date: new Date()
      });
      return void res.status(201).json(attendance);
    } catch (error) {
      next(error);
    }
  }

  async getStudentAttendance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId } = req.params;
      const attendances = await this.repository.find({ 
        where: { student: { id: Number(studentId) } }
      });
      return void res.json(attendances);
    } catch (error) {
      next(error);
    }
  }

  async getBatchAttendance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { batchId } = req.params;
      const attendances = await this.repository.find({
        where: { batch: { id: Number(batchId) } }
      });
      return void res.json(attendances);
    } catch (error) {
      next(error);
    }
  }

  async getAttendanceStreak(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId } = req.params;
      const attendances = await this.repository.find({
        where: { student: { id: Number(studentId) } },
        order: { date: 'DESC' }
      });
      // Streak calculation logic here
      return void res.json({ streak: 0 });
    } catch (error) {
      next(error);
    }
  }
}
