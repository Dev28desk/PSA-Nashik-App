

import { ApiProperty } from '@nestjs/swagger';
import { ChartConfiguration } from 'chart.js';

export class VisualizationResponseDto {
  @ApiProperty({ description: 'Revenue trend chart configuration' })
  revenueChart: ChartConfiguration;

  @ApiProperty({ description: 'User activity chart configuration' })
  activityChart: ChartConfiguration;

  @ApiProperty({ description: 'Payment methods chart configuration' })
  paymentChart: ChartConfiguration;
}

