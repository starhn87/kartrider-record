import styled from '@emotion/styled'
import React, { memo, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import More from './More'
import { MatchProps } from '../../interface'

export default memo(function Match({ data }: MatchProps) {
  const [more, setMore] = useState(false)

  const onClick = () => {
    setMore((prev) => !prev)
  }

  return (
    <Wrapper>
      <Container
        className={data.rank === 1 ? 'win' : data.retired ? 'retired' : ''}
      >
        <Element className="type">{data.timeDiff}</Element>
        <Element
          className={`result ${
            data.rank === 1 ? 'win' : data.retired ? 'retired' : ''
          }`}
        >
          {data.retired ? '#리타이어' : `#${data.rank}`}
          <span
            className={data.retired ? 'hidden' : ''}
          >{`/ ${data.playerCount}`}</span>
        </Element>
        <Element className="track">{data.track}</Element>
        <Element className="kart">{data.kart}</Element>
        <Element className="time">{data.playTime}</Element>
        <Element
          onClick={onClick}
          className={`open ${
            data.rank === 1 ? 'win' : data.retired ? 'retired' : ''
          }`}
        >
          <MdArrowDropDown />
        </Element>
      </Container>
      {more && <More matchId={data.matchId} />}
    </Wrapper>
  )
})

const Wrapper = styled.section``

const Container = styled.div`
  position: relative;
  display: table;
  width: 100%;
  height: 88px;
  margin-bottom: 5px;
  font-size: 16px;
  background-color: #fff;
  border-width: 1px 1px 1px 4px;
  border-color: #f2f2f2 #f2f2f2 #f2f2f2 var(--gray);
  border-style: solid;

  &.win {
    border-color: #f2f2f2 #f2f2f2 #f2f2f2 var(--blue);
    background-color: rgba(0, 119, 255, 0.05);
  }

  &.retired {
    border-color: #f2f2f2 #f2f2f2 #f2f2f2 var(--red);
    background-color: rgba(246, 36, 89, 0.05);
  }
`

const Element = styled.p`
  display: table-cell;
  width: 150px;
  height: 30px;
  vertical-align: middle;

  &.type {
    width: 65px;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
  }

  &.result {
    width: 140px;
    padding-left: 10px;
    color: var(--gray);
    font-size: 30px;
    font-weight: bold;
    font-style: italic;
    text-align: left;

    &.win {
      color: var(--blue);
    }

    &.retired {
      color: var(--red);
    }

    span {
      margin-left: 5px;
      font-size: 16px;

      &.hidden {
        display: none;
      }
    }
  }

  &.track,
  &.kart {
    position: relative;
    font-weight: 400;
    text-align: center;
  }

  &.time {
    width: 100px;
    font-weight: bold;
    text-align: center;
  }

  &.open {
    position: absolute;
    width: 40px;
    height: 87px;
    right: 0;
    box-sizing: border-box;
    line-height: 87px;
    font-weight: 400;
    text-align: center;
    border-left: 1px solid #ebebeb;

    &:hover {
      background-color: #ebebeb;
      cursor: pointer;
      &.win {
        background-color: rgba(0, 119, 255, 0.1);
      }
      &.retired {
        background-color: rgba(246, 36, 89, 0.1);
      }
    }
  }
`
