
import { Controller, Get, UseGuards } from '@nestjs/common';
import { DataAggregatorService } from '../services/data-aggregator.service';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DashboardMetricsDto } from '../dto/dashboard-metrics.dto';

@Controller('admin/dashboard')
@UseGuards(AdminGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly aggregator: DataAggregatorService) {}

  @Get('metrics')
  @ApiResponse({ type: DashboardMetricsDto })
  async getMetrics() {
    return this.aggregator.getDashboardMetrics();
  }
}
