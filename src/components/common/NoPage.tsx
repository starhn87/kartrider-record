import React from 'react'
import styled from '@emotion/styled'

export default function NoItem() {
  return <Wrapper>추후 서비스될 페이지입니다.</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  font-size: 30px;
  justify-content: center;
  align-items: center;
`
