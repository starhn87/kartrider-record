import styled from '@emotion/styled'
import React, { ChangeEvent, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const TAB_ITEMS = [
  {
    key: 0,
    name: '전적',
    active: true,
    to: '/',
  },
  {
    key: 1,
    name: '랭킹',
    active: false,
    to: '/rank',
  },
]

export default function Header() {
  const { pathname } = useLocation()
  const [value, setValue] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <Wrapper>
      <Sector>
        <Logo
          src="https://tmi.nexon.com/img/assets/tmi_logo_default_b.svg"
          alt="로고"
        />
      </Sector>
      <Sector>
        <Menu>
          {TAB_ITEMS.map((item) => (
            <Content
              key={item.key}
              to={item.to}
              className={pathname === item.to ? 'active' : ''}
            >
              {item.name}
            </Content>
          ))}
        </Menu>
      </Sector>
      <Sector>
        <SearchWrapper>
          <SearchBar
            value={value}
            onChange={onChange}
            placeholder="닉네임 검색"
          />
        </SearchWrapper>
      </Sector>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  position: fixed;
  display: flex;
  width: 100%;
  height: 7rem;
  top: 0;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
  }
`

const Sector = styled.section`
  margin: 0 2rem;
`

const Logo = styled.img`
  width: 7rem;
  height: 100%;

  /* @media (max-width: 768px) {
    display: none;
  } */
`

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Content = styled(Link)`
  min-width: 50px;
  height: 5rem;
  padding: 1rem;

  &:hover {
    cursor: pointer;
  }

  &.active {
    border-bottom: 3px solid #0077ff;
  }
`

const SearchWrapper = styled.form`
  height: 70%;
  padding: 0;
  border: 1px solid rgb(229, 229, 229);
  border-radius: 20px;
  overflow: hidden;
`

const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;
  border: none;
  background-color: transparent;

  &::placeholder {
    color: var(--gray);
  }
`
