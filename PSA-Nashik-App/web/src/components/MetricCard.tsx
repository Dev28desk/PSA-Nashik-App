


import { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: 'up' | 'down' | 'neutral'
  loading?: boolean
}

export default function MetricCard({ title, value, icon, trend, loading = false }: MetricCardProps) {
  const trendColor = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  }[trend || 'neutral']

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center">
        {loading ? (
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        ) : (
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        )}
        {icon && <div className="text-blue-500">{icon}</div>}
      </div>
      <div className="mt-2">
        {loading ? (
          <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
        ) : (
          <>
            <p className="text-2xl font-semibold">{value}</p>
            {trend && (
              <div className={`flex items-center mt-1 text-sm ${trendColor}`}>
                {trend === 'up' ? '↑' : '↓'} 5% from last month
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}


