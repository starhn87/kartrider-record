import styled from '@emotion/styled'
import { Chart } from 'chart.js'
import React, { useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { DonutProps } from '../interface'

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
  margin: 8px 0;
  width: 100%;
  font-size: 14px;

  :not(:last-child) {
    border-right: 1px solid #f2f2f2;
  }
`

const Title = styled.p`
  text-align: center;
`

const GraphWrapper = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 83px;
  height: 83px;
  border-radius: 50%;
`

const ChartText = styled.span<{ textColor: string }>`
  position: absolute;
  font-size: 20px;
  color: ${({ textColor }) => textColor};
`
