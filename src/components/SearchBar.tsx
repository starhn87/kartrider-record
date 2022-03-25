import styled from '@emotion/styled'
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import { MdSearch } from 'react-icons/md'
import { nickname } from '../redux/slice'
import { useAppDispatch } from '../redux/store'

export default function SearchBar() {
  const [editingValue, setEditingValue] = useState('')
  const [focused, setFocused] = useState(false)
  const dispatch = useAppDispatch()
  const navigator = useNavigate()
  const { pathname } = useLocation()
  const searchRef = useRef<HTMLInputElement | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value)
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    setEditingValue('')
    searchRef.current?.blur()
    dispatch(nickname(editingValue))

    if (pathname !== '/') {
      navigator('/')
    }
  }

  return (
    <SearchBarWrapper className={focused ? 'active' : ''}>
      <Form onSubmit={onSubmit}>
        <Search
          ref={searchRef}
          value={editingValue}
          onChange={onChange}
          type="text"
          placeholder="닉네임 검색"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          spellCheck={false}
        />
        <Button type="submit">
          <MdSearch size={18} />
        </Button>
      </Form>
    </SearchBarWrapper>
  )
}

const SearchBarWrapper = styled.div`
  width: 195px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  opacity: 0.5;
  transition: 0.3s ease;

  &:hover,
  &.active {
    opacity: 1;
  }
`

const Form = styled.form`
  display: grid;
  height: 100%;
  padding: 5px 0;
  grid-template-columns: 85% 15%;
  align-items: center;
`

const SelectWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid white;
`

const Search = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 0 0 10px;
  background-color: transparent;
  border: none;
  font-size: 12px;
  color: white;

  &::placeholder {
    color: white;
  }

  &:focus {
  }
`
const Button = styled.button`
  position: relative;
  top: 4px;
  font-size: 14px;
  color: white;
  background-color: transparent;
`
