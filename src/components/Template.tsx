import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Template() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`
