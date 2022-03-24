import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
`

const FooterWrapper = styled.div`
  width: 1000px;
  margin: auto;

  @media (min-width: 1630px) {
    width: 1300px;
  }
`
