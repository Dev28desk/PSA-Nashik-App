

import { ApiProperty } from '@nestjs/swagger';

export class DashboardMetricsDto {
  @ApiProperty({ 
    description: 'Total revenue in paise',
    example: 15000 
  })
  revenue: number;

  @ApiProperty({ 
    description: 'Number of completed transactions',
    example: 42
  })
  transactions: number;

  @ApiProperty({ 
    description: 'Active users in last 30 days',
    example: 37
  })
  activeUsers: number;
}

