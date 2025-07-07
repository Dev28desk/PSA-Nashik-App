


import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface BarChartProps {
  data: {
    labels: string[]
    values: number[]
  }
  title?: string
}

export default function BarChart({ data, title }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: title,
          data: data.values,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })

    return () => chart.destroy()
  }, [data])

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <canvas ref={chartRef} />
    </div>
  )
}


