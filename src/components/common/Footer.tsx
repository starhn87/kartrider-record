import styled from '@emotion/styled'
import React from 'react'

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <Box>
          <Logo src="	https://tmi.nexon.com/img/assets/lab_logo.svg" />
          <Copy>Data based on NEXON DEVELOPERS</Copy>
        </Box>
        <div>
          <List>
            <Item>
              <Text>About TMI</Text>
            </Item>
            <Item>
              <Text>문의/피드백</Text>
            </Item>
            <Item>
              <Text>업데이트 로그</Text>
            </Item>
            <Item>
              <Text>채용</Text>
            </Item>
          </List>
        </div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  padding-bottom: 30px;
  background-color: #fafafa;
`

const Container = styled.div`
  margin: 0 auto;
`

const Box = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  width: 140px;
  opacity: 0.3;
`

const Copy = styled.span`
  display: inline-block;
  width: 250px;
  padding-left: 10px;
  font-weight: 400;
  font-size: 12px;
  color: var(--gray);
  border-left: 1px solid #ccc;
`

const List = styled.ul`
  display: flex;
`

const Item = styled.li`
  margin-top: 10px;
  margin-right: 10px;
  padding-right: 10px;
  font-weight: 400;
`

const Text = styled.span`
  color: var(--gray);
  font-size: 12px;
`
