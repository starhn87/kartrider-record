import React from 'react'
import styled from '@emotion/styled'
import { Line } from 'react-chartjs-2'
import { LineCardProps } from '../../interface'

export default function LineCard({ data }: LineCardProps) {
  const chartData = {
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
  }

  const options = {
    maintainAspectRatio: false,
    events: [],
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 0,
        right: 10,
        left: 10,
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
  }

  return (
    <Wrapper>
      <Line options={options} data={chartData} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  canvas {
    width: 98% !important;
    height: 210px !important;
  }
`
