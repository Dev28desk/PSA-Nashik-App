
import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from '../attendance.model';

@EntityRepository(Attendance)
export class AttendanceRepository extends Repository<Attendance> {
  async markAttendance(
    studentId: number,
    batchId: number,
    present: boolean,
    markedBy: number,
    locationData?: { lat: number; lng: number; timestamp: Date } | null
  ): Promise<Attendance> {
    const attendance = {
      student: { id: studentId },
      batch: { id: batchId },
      date: new Date(),
      present,
      markedBy: { id: markedBy },
      locationData: locationData ? {
        lat: locationData.lat,
        lng: locationData.lng,
        timestamp: locationData.timestamp || new Date()
      } : null
    };

    return this.save(attendance as Attendance);
  }
}
