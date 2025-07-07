


import { Injectable } from '@nestjs/common';
import { ChartConfiguration } from 'chart.js';

@Injectable()
export class ChartBuilder {
  private readonly colors = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(255, 159, 64, 0.8)'
  ];

  buildDashboardCharts(metrics: {
    revenueTrend: number[],
    userActivity: number[],
    paymentMethods: number[]
  }): { 
    revenueChart: ChartConfiguration,
    activityChart: ChartConfiguration,
    paymentChart: ChartConfiguration 
  } {
    const dateLabels = Array.from({length: 30}, (_, i) => 
      new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString()
    );

    return {
      revenueChart: this.buildLineChart(
        'Revenue Trend (Last 30 Days)',
        metrics.revenueTrend,
        dateLabels,
        '₹'
      ),
      activityChart: this.buildBarChart(
        'User Activity',
        metrics.userActivity,
        dateLabels
      ),
      paymentChart: this.buildDoughnutChart(
        'Payment Methods',
        metrics.paymentMethods,
        ['Credit Card', 'UPI', 'Wallet']
      )
    };
  }

  private buildLineChart(
    label: string,
    data: number[],
    labels: string[],
    unit: string = ''
  ): ChartConfiguration {
    return {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data,
          borderColor: this.colors[0],
          backgroundColor: this.colors[0].replace('0.8', '0.2'),
          tension: 0.4,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: value => `${unit}${value}` }
          }
        }
      }
    };
  }

  private buildBarChart(
    label: string,
    data: number[],
    labels: string[]
  ): ChartConfiguration {
    return {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: this.colors[1],
          borderColor: this.colors[1].replace('0.8', '1'),
          borderWidth: 1
        }]
      }
    };
  }

  private buildDoughnutChart(
    label: string,
    data: number[],
    labels: string[]
  ): ChartConfiguration {
    return {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: this.colors,
          borderWidth: 1
        }]
      }
    };
  }
}


