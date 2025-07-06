
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { Attendance } from './attendance.model';
import { AttendanceRepository } from './repositories/attendance.repository';

export class AttendanceController {
  private repository: AttendanceRepository;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Attendance).extend(AttendanceRepository.prototype);
  }

  async markAttendance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId, batchId, present, location } = req.body;
      
      if (!req.user) {
        throw new Error('Authentication required');
      }
      const markedBy = req.user.id;

      if (location && (!location.lat || !location.lng)) {
        throw new Error('Invalid location data');
      }

      const attendance = await this.repository.markAttendance(
        studentId,
        batchId,
        present,
        markedBy,
        location ? { lat: location.lat, lng: location.lng, timestamp: new Date() } : undefined
      );

      res.json(attendance);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getStudentAttendance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId } = req.params;
      const attendances = await this.repository.find({ where: { student: { id: Number(studentId) } } });
      res.json(attendances);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getBatchAttendance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { batchId } = req.params;
      const attendances = await this.repository.find({ where: { batch: { id: Number(batchId) } } });
      res.json(attendances);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getAttendanceStreak(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId } = req.params;
      const attendances = await this.repository.find({ 
        where: { student: { id: Number(studentId) } },
        order: { date: 'DESC' }
      });
      
      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      for (const attendance of attendances) {
        if (attendance.present && attendance.date >= today) {
          streak++;
        } else {
          break;
        }
      }
      
      res.json({ streak });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
