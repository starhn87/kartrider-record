import React from 'react'
import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { matchApi } from '../../api'
import { IPlayer, MoreProps } from '../../interface'
import { reset } from '../../redux/slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { formatTime, onError } from '../../util'
import Loading from '../common/Loading'

export default function More({ matchId }: MoreProps) {
  const userId = useAppSelector((state) => state.user.id)
  const dispatch = useAppDispatch()
  const navigator = useNavigate()
  const { data, isFetching } = useQuery(
    [matchId],
    () => matchApi.detail(matchId),
    {
      staleTime: 60 * 1000,
      onError: () => {
        alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.')
        dispatch(reset())
        navigator('/')
      },
    },
  )

  if (isFetching || !data) {
    return <Loading />
  }

  return (
    <Wrapper>
      <List>
        <Item>
          <Box>
            <Content className="rank">#</Content>
            <Content className="kart">카트</Content>
            <Content className="nick">유저</Content>
            <Content className="time">기록</Content>
          </Box>
        </Item>
        {data.map((player: IPlayer) => (
          <Item key={player.accountNo}>
            <Box className={`${userId === player.accountNo ? 'my' : ''}`}>
              <Content
                className={`rank ${
                  player.matchRetired === '1' ? 'retired' : ''
                } ${userId === player.accountNo ? 'my' : ''} ${
                  player.matchRank === '1' ? 'first' : ''
                }`}
              >
                {player.matchRank === '99' ? '리타이어' : player.matchRank}
              </Content>
              <Content className="kart">
                <CartImg
                  src={`https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/${player.kart}.png`}
                  onError={onError}
                  alt="카트 이미지"
                />
              </Content>
              <Content
                className={`nick ${userId === player.accountNo ? 'my' : ''} ${
                  player.matchRank === '1' ? 'first' : ''
                }`}
              >
                <Nickname>{player.characterName}</Nickname>
              </Content>
              <Content
                className={`time ${userId === player.accountNo ? 'my' : ''} ${
                  player.matchRank === '1' ? 'first' : ''
                }`}
              >
                {player.matchRetired === '1'
                  ? '-'
                  : formatTime(Number(player.matchTime))}
              </Content>
            </Box>
          </Item>
        ))}

        {data.length < 8 &&
          new Array(8 - data.length).fill(0).map((temp, index) => (
            <Item key={index}>
              <Box>
                <Content className="rank retired">리타이어</Content>
                <Content className="kart"></Content>
                <Content className="nick">
                  <Nickname></Nickname>
                </Content>
                <Content className="time">-</Content>
              </Box>
            </Item>
          ))}
      </List>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 177px;
  margin-top: -5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  border-width: 1px 1px 1px 1px;
  border-color: #f2f2f2;
  border-style: solid;

  &.hidden {
    display: none;
  }
`

const List = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`

const Item = styled.li`
  float: left;
`

const Box = styled.div`
  background-color: #fff;
  text-align: center;
  font-size: 12px;

  &.my {
    background-color: #f2f3f4;
    font-weight: bold;
  }
`

const Content = styled.div`
  &.my.first {
    color: var(--blue);
  }

  &.rank {
    height: 40px;
    line-height: 40px;
    background-color: #f2f2f2;

    &.my {
      background-color: #e6e8eb;
    }

    &.first {
      color: var(--blue);

      &.my {
        background-color: #e5ecf5;
      }
    }

    &.retired {
      color: var(--red);
    }
  }

  &.kart {
    height: 78px;
    line-height: 78px;
  }

  &.nick {
    height: 17px;
    line-height: 17px;
  }

  &.time {
    height: 42px;
    line-height: 42px;
  }
`

const CartImg = styled.img`
  height: 35px;
  vertical-align: middle;
`

const Nickname = styled.span``
