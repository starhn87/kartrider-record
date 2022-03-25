import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import { CardProps } from '../../interface'

export default function Card({ title, point, children }: CardProps) {
  return (
    <Wrapper>
      <Title>
        <Point>{point}</Point> {title}
      </Title>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
  border: 1px solid #f2f2f2;

  :not(:last-child) {
    margin-right: 10px;
  }
`

const Title = styled.h5`
  margin: 0 12px;
  padding: 0 8px;
  line-height: 40px;
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  color: #1f334a;
`

const Point = styled.span`
  color: var(--blue);
`
