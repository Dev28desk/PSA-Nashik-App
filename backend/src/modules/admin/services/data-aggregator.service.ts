
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';

@Injectable()
export class DataAggregatorService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Attendance) 
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async getDashboardMetrics() {
    const [payments, attendance] = await Promise.all([
      this.paymentRepository.createQueryBuilder('payment')
        .select('SUM(payment.amount)', 'totalRevenue')
        .addSelect('COUNT(payment.id)', 'totalTransactions')
        .getRawOne(),
        
      this.attendanceRepository.createQueryBuilder('attendance')
        .select('COUNT(DISTINCT attendance.userId)', 'activeUsers')
        .where('attendance.date >= :date', { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) })
        .getRawOne()
    ]);

    return {
      revenue: payments.totalRevenue || 0,
      transactions: payments.totalTransactions || 0,
      activeUsers: attendance.activeUsers || 0
    };
  }

  async getVisualizationData() {
    const [revenueTrend, userActivity, paymentMethods] = await Promise.all([
      this.getRevenueTrendData(),
      this.getUserActivityData(),
      this.getPaymentMethodData()
    ]);

    return {
      revenueTrend,
      userActivity, 
      paymentMethods
    };
  }

  private async getRevenueTrendData(): Promise<number[]> {
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .select(`DATE_TRUNC('day', payment.createdAt)`, 'date')
      .addSelect('SUM(payment.amount)', 'total')
      .where('payment.createdAt >= :date', { 
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    return this.fillDateGaps(result, 'total');
  }

  private async getUserActivityData(): Promise<number[]> {
    const result = await this.attendanceRepository
      .createQueryBuilder('attendance')
      .select(`DATE_TRUNC('day', attendance.date)`, 'date')
      .addSelect('COUNT(DISTINCT attendance.userId)', 'count')
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    return this.fillDateGaps(result, 'count');
  }

  private async getPaymentMethodData(): Promise<number[]> {
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('payment.method', 'method')
      .addSelect('COUNT(payment.id)', 'count')
      .groupBy('method')
      .getRawMany();

    return [
      result.find(r => r.method === 'credit_card')?.count || 0,
      result.find(r => r.method === 'upi')?.count || 0,
      result.find(r => r.method === 'wallet')?.count || 0
    ];
  }

  private fillDateGaps(data: any[], valueKey: string): number[] {
    const filled = Array(30).fill(0);
    const today = new Date();
    
    data.forEach(item => {
      const daysAgo = Math.floor(
        (today.getTime() - new Date(item.date).getTime()) / (1000 * 60 * 60 * 24)
      );
      const index = 29 - Math.floor(daysAgo);
      if (index >= 0 && index < 30) {
        filled[index] = Number(item[valueKey]) || 0;
      }
    });

    return filled;
  }
}
