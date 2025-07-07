

import { useEffect, useState } from 'react'
import axios from 'axios'
import type { DashboardMetrics } from '../types/dashboard'
import MetricCard from '../components/MetricCard'
import BarChart from '../components/BarChart'
import ErrorBoundary from '../components/ErrorBoundary'
import { FiUsers, FiActivity, FiDollarSign } from 'react-icons/fi'

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/admin/metrics`)
        setMetrics(res.data)
      } catch (err) {
        setError('Failed to load dashboard data')
        console.error('API Error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="loading">Loading dashboard...</div>
  if (error) return <div className="error">{error}</div>
  if (!metrics) return <div>No data available</div>

  // Sample data for demonstration - replace with actual API data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    values: metrics.attendanceTrend || [65, 59, 80, 81, 56]
  }

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <ErrorBoundary>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <MetricCard 
            title="Total Users" 
            value={metrics.totalUsers} 
            icon={<FiUsers />}
            trend="up"
            loading={loading}
          />
          <MetricCard 
            title="Active Users" 
            value={metrics.activeUsers} 
            icon={<FiActivity />}
            loading={loading}
          />
          {metrics.revenue && (
            <MetricCard 
              title="Monthly Revenue" 
              value={`₹${metrics.revenue.currentMonth.toLocaleString()}`}
              icon={<FiDollarSign />}
              trend={metrics.revenue.currentMonth > metrics.revenue.previousMonth ? 'up' : 'down'}
              loading={loading}
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-8">
          <BarChart 
            data={chartData}
            title="Monthly Attendance Trend"
          />
        </div>
      </ErrorBoundary>
    </div>
  )
}

