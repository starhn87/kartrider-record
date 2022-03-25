import styled from '@emotion/styled'
import { Chart } from 'chart.js'
import React, { useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { DonutProps } from '../../interface'

export default function Donut({
  title,
  data,
  backgroundColor,
  text,
  textColor,
}: DonutProps) {
  const chartData = {
    datasets: [
      {
        data,
        backgroundColor: [backgroundColor, 'rgba(235,235,235, 1)'],
        fill: false,
      },
    ],
  }

  const option = {
    responsive: false,
    cutout: 30,
    plugins: {
      legend: {
        display: false,
      },
    },
    centerText: {
      display: true,
      text: `90%`,
    },
    events: [],
  }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <GraphWrapper>
        <Doughnut options={option} data={chartData} width={83} height={83} />
        <ChartText textColor={textColor}>{text}</ChartText>
      </GraphWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: 8px 0;
  font-size: 14px;

  :not(:last-child) {
    border-right: 1px solid #f2f2f2;
  }
`

const Title = styled.p`
  text-align: center;
`

const GraphWrapper = styled.div`
  display: flex;
  width: 83px;
  height: 83px;
  margin: 20px auto;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const ChartText = styled.span<{ textColor: string }>`
  position: absolute;
  font-size: 20px;
  color: ${({ textColor }) => textColor};
`
