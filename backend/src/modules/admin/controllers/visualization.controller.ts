


import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataAggregatorService } from '../services/data-aggregator.service';
import { ChartBuilder } from '../utils/chart-builder.util';
import { VisualizationResponseDto } from '../dto/visualization-response.dto';
import { AdminGuard } from '../../auth/guards/admin.guard';

@ApiTags('Admin Dashboard')
@Controller('admin/visualization')
@UseGuards(AdminGuard)
@ApiBearerAuth()
export class VisualizationController {
  constructor(
    private readonly aggregator: DataAggregatorService,
    private readonly chartBuilder: ChartBuilder,
  ) {}

  @Get()
  @ApiResponse({ 
    type: VisualizationResponseDto,
    description: 'Returns chart configurations for admin dashboard' 
  })
  async getVisualizations() {
    const data = await this.aggregator.getVisualizationData();
    return this.chartBuilder.buildDashboardCharts(data);
  }
}


