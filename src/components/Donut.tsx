import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { DonutProps } from '../interface'

export default function Donut({ title, data, backgroundColor }: DonutProps) {
  const getData = () => {
    const result = {
      datasets: [
        {
          data,
          backgroundColor: [backgroundColor, 'rgba(235,235,235, 1)'],
          fill: false,
        },
      ],
    }

    return result
  }

  const getOption = () => ({
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  })

  return (
    <div>
      <p>{title}</p>
      <Doughnut options={getOption()} data={getData()} width={83} height={83} />
    </div>
  )
}
