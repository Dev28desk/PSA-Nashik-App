


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './controllers/admin.controller';
import { AnalyticsService } from './services/analytics.service';
import { DataAggregatorService } from './services/data-aggregator.service';
import { DashboardController } from './controllers/dashboard.controller';
import { VisualizationController } from './controllers/visualization.controller';
import { ChartBuilder } from './utils/chart-builder.util';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '../auth/guards/admin.guard';
import { Payment } from '../../payments/entities/payment.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Attendance])
  ],
  controllers: [
    AdminController,
    DashboardController,
    VisualizationController
  ],
  providers: [
    AnalyticsService,
    DataAggregatorService,
    ChartBuilder,
    JwtService,
    AdminGuard
  ],
  exports: [AnalyticsService]
})
export class AdminModule {}


