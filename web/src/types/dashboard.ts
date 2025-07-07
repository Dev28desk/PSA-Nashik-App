

export interface DashboardMetrics {
  totalUsers: number
  activeUsers: number
  newRegistrations: number
  revenue?: {
    currentMonth: number
    previousMonth: number
  }
  attendanceRate?: number
  attendanceTrend?: number[]
  popularSports?: Array<{
    name: string
    participants: number
  }>
  // Additional metrics from backend can be added here
}

export type ApiResponse<T> = {
  data: T
  timestamp: string
  status: number
}

