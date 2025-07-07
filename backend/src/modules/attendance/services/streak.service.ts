


import { Injectable } from '@nestjs/common';
import { AttendanceRecord } from '../entities/attendance.entity';

@Injectable()
export class StreakService {
  calculateCurrentStreak(records: AttendanceRecord[]): number {
    let streak = 0;
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    
    // Sort records by date (newest first)
    const sorted = [...records].sort((a,b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime());

    for (let i = 0; i < sorted.length; i++) {
      const currentDate = new Date(sorted[i].date);
      const prevDate = i > 0 ? new Date(sorted[i-1].date) : today;
      
      if ((prevDate.getTime() - currentDate.getTime()) <= oneDay) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  getLongestStreak(records: AttendanceRecord[]): number {
    // Implementation for tracking longest historical streak
    return Math.max(...this.getStreakRanges(records));
  }

  private getStreakRanges(records: AttendanceRecord[]): number[] {
    // Helper method for streak analysis
    const streaks = [];
    let currentStreak = 1;
    
    const sorted = [...records].sort((a,b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime());

    for (let i = 1; i < sorted.length; i++) {
      const diffDays = Math.round(
        (new Date(sorted[i].date).getTime() - 
         new Date(sorted[i-1].date).getTime()) / oneDay);
      
      if (diffDays === 1) currentStreak++;
      else {
        streaks.push(currentStreak);
        currentStreak = 1;
      }
    }
    streaks.push(currentStreak);
    return streaks;
  }
}


