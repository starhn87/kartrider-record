import React from 'react'
import { Line } from 'react-chartjs-2'
import { LineCardProps } from '../interface'

export default function LineCard({ data }: LineCardProps) {
  const getData = () => ({
    labels: data,
    datasets: [
      {
        data,
        borderColor: 'rgba(1,119,255, 1)',
        borderWidth: 1.5,
        pointRadius: 1.5,
        pointBorderColor: 'rgba(1,119,255, 1)',
        pointColor: 'rgba(1,119,255, 1)',
        fill: false,
      },
    ],
  })

  return (
    <div>
      <Line
        options={{
          responsive: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          layout: {
            padding: {
              top: 10,
              bottom: 10,
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              reverse: true,
              suggestedMin: 1,
              suggestedMax: 8,
            },
          },
        }}
        data={getData()}
      />
    </div>
  )
}
