import styled from '@emotion/styled'
import React, { ChangeEvent, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MdClear } from 'react-icons/md'
import SearchBar from './SearchBar'

const TAB_ITEMS = [
  {
    key: 0,
    name: '홈',
    active: true,
    to: '/',
  },
  {
    key: 1,
    name: '랭킹',
    active: false,
    to: '/rank',
  },
  {
    key: 2,
    name: '카트',
    active: false,
    to: '/body',
  },
  {
    key: 3,
    name: '트랙',
    active: false,
    to: '/track',
  },
]

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const onClick = (pathname: string) => {
    navigate(pathname)
  }

  return (
    <Wrapper>
      <Container>
        <Logo src="https://tmi.nexon.com/img/assets/logo_kart.png" alt="로고" />
        <Sector>
          <Menu>
            {TAB_ITEMS.map((item) => (
              <Content key={item.key}>
                <Box
                  className={pathname === item.to ? 'active' : ''}
                  onClick={() => onClick(item.to)}
                >
                  <SLink to={item.to}>{item.name}</SLink>
                </Box>
              </Content>
            ))}
          </Menu>
        </Sector>
        <Sector>
          <SearchBar />
        </Sector>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #005fcc;

  @media (max-width: 768px) {
  }
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 55px;
`

const Sector = styled.section`
  margin: 0 2rem;

  &:hover {
    cursor: pointer;
  }
`

const Logo = styled.img`
  width: 7rem;

  /* @media (max-width: 768px) {
    display: none;
  } */
`

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Content = styled.li`
  width: 120px;
  height: 100%;
`

const Box = styled.div`
  width: 80px;
  padding: 13px;
  border-bottom: 4px solid hsla(0, 0%, 100%, 0);
  text-align: center;
  transition: all 0.15s ease-in-out;
  opacity: 0.5;

  &.active,
  &:hover {
    border-bottom: 4px solid hsla(0, 0%, 100%, 100);
    opacity: 1;
  }
`

const SLink = styled(NavLink)`
  width: 100%;
  font-weight: bold;
  color: white;
`
