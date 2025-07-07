


import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from '../services/analytics.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('admin/analytics')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('attendance')
  async getAttendanceTrends() {
    return this.analyticsService.getAttendanceTrends();
  }

  @Get('payments')
  async getPaymentStats() {
    return this.analyticsService.getPaymentStats();
  }
}


