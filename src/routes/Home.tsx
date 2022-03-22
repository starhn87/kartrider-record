import React, { Suspense, useState } from 'react'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { useQuery } from 'react-query'
import { searchApi } from '../api'
import UserInfo from '../components/UserInfo'
import { MdInfo } from 'react-icons/md'
import Card from '../components/Card'
import Loading from '../components/Loading'
import Donut from '../components/Donut'
import LineCard from '../components/LineCard'
import TrackInfo from '../assets/track.json'
import KarInfo from '../assets/kart.json'
import { formatTime, subDate } from '../util'
import Match from '../components/Match'
import { IInfo, IMatch, IRecord } from '../interface'
import { userId } from '../redux/slice'

export default function Home() {
  const nickname = useAppSelector((state) => state.user.nickname)
  const dispatch = useAppDispatch()
  const { data, isFetching } = useQuery(
    [nickname],
    () => searchApi.username(nickname),
    {
      staleTime: 60 * 1000,
    },
  )

  if (isFetching || !data) {
    return <Loading />
  }

  dispatch(userId(data.userInfo.accessId))

  let retireCnt = 0
  let winCnt = 0
  const ranks: number[] = []
  const matches: IMatch[] = data.data.matches[0].matches
  const record: IRecord[] = []

  matches.forEach((match) => {
    if (match.player.matchRetired === '1') {
      retireCnt += 1
    }

    if (match.player.matchWin === '1') {
      winCnt += 1
    }

    const rank = Number(match.player.matchRank)
    ranks.unshift(rank >= 8 ? 8 : rank < 1 ? 1 : rank)

    record.push({
      matchId: match.matchId,
      track: (TrackInfo.find((info) => info.id === match.trackId) as IInfo)
        .name as string,
      rank,
      playerCount: match.playerCount,
      kart: (KarInfo.find((info) => info.id === match.player.kart) as IInfo)
        .name,
      playTime: formatTime(Number(match.player.matchTime)),
      timeDiff: subDate(match.endTime),
      retired: match.player.matchRetired === '1',
    })
  })

  const winRate = Math.round((winCnt / matches.length) * 100)
  const noRetiredRate = 100 - Math.round((retireCnt / matches.length) * 100)

  const winRateData = {
    title: '승률',
    data: [winRate, 100 - winRate],
    backgroundColor: 'rgba(1,119,255, 1)',
  }

  const noRetiredData = {
    title: '완주율',
    data: [noRetiredRate, 100 - noRetiredRate],
    backgroundColor: 'rgba(155,214,40, 1)',
  }

  const retiredData = {
    title: '리타이어율',
    data: [100 - noRetiredRate, noRetiredRate],
    backgroundColor: 'rgba(246,36,88, 1)',
  }

  const ranksPart = ranks.slice(
    ranks.length >= 50 ? ranks.length - 50 : 0,
    ranks.length,
  )

  return (
    <Wrapper>
      <Info>
        <MdInfo style={{ marginRight: 5 }} />
        <span>
          카트라이더 매치데이터는 최근 1년치 데이터만 확인할 수 있습니다
        </span>
      </Info>
      <UserInfo
        nickname={data.userInfo.name}
        character={data.data.matches[0].matches[0].character}
        matchType={data.data.matches[0].matchType}
      />
      <Container>
        <Card point="종합" title="전적">
          <ChartWrapper>
            <Donut {...winRateData} />
            <Donut {...noRetiredData} />
            <Donut {...retiredData} />
          </ChartWrapper>
        </Card>
        <Card point="순위변동" title="추이">
          <LineCard data={ranksPart} />
        </Card>
        <Card point="응원" title="한마디" />
      </Container>
      <Box>
        <Record>1</Record>
        <Record>
          {record.map((match) => (
            <Match key={match.matchId} data={match} />
          ))}
        </Record>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 1000px;
  min-width: 60rem;
  margin: auto;
`

const Info = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
  font-size: 12px;
`

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  margin-top: 20px;
`
const ChartWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const Box = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: 1fr 2fr;
`

const Record = styled.div`
  :not(:last-child) {
    margin-right: 10px;
  }
`
