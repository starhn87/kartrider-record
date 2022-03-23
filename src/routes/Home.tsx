import React, { useEffect } from 'react'
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
import KartInfo from '../assets/kart.json'
import { formatTime, subDate } from '../util'
import Match from '../components/Match'
import {
  IInfo,
  IKartInfo,
  IMatch,
  IRecord,
  ITrackInfo,
  ITrackRecord,
} from '../interface'
import { home } from '../redux/slice'
import Tab from '../components/Tab'
import { shallowEqual } from 'react-redux'
import Cheer from '../components/Cheer'

export default function Home() {
  const { nickname, gameType } = useAppSelector(
    (state) => ({
      nickname: state.user.nickname,
      gameType: state.user.gameType,
    }),
    shallowEqual,
  )
  const dispatch = useAppDispatch()
  const { data, isFetching, refetch } = useQuery(
    [nickname, gameType],
    () => searchApi.username(nickname, gameType),
    {
      staleTime: 60 * 1000,
    },
  )

  if (isFetching || !data) {
    return <Loading />
  }

  let retireCnt = 0
  let winCnt = 0
  const ranks: number[] = []
  const matches: IMatch[] = data.data.matches[0].matches
  const record: IRecord[] = []
  const kartInfo = new Map<string, IKartInfo>()
  const trackInfo = new Map<string, ITrackInfo>()

  const calcThings = (
    match: IMatch,
    track: string,
    rank: number,
    kart: string,
  ) => {
    if (match.player.matchRetired === '1') {
      retireCnt += 1
    }

    if (match.player.matchWin === '1') {
      winCnt += 1
    }

    record.push({
      matchId: match.matchId,
      track,
      rank,
      playerCount: match.playerCount,
      kart,
      playTime:
        match.player.matchRetired === '1'
          ? '-'
          : formatTime(Number(match.player.matchTime)),
      timeDiff: subDate(match.endTime),
      retired: match.player.matchRetired === '1',
    })
  }

  const calcKart = (match: IMatch, kart: string, track: string) => {
    let info: IKartInfo

    if (kartInfo.has(kart)) {
      info = kartInfo.get(kart) as IKartInfo
    } else {
      info = {
        map: [],
        id: '',
        name: kart,
        count: 0,
        winCount: 0,
        retireCount: 0,
      }
    }

    info.id = match.player.kart
    info.count += 1

    if (match.player.matchRetired === '1') {
      info.retireCount += 1
    }

    if (match.player.matchWin === '1') {
      info.winCount += 1
    }

    const matchTime = Number(match.player.matchTime)

    if (matchTime > 0) {
      info.map.push({
        name: track,
        record: matchTime,
        id: match.trackId,
      })
    }

    kartInfo.set(kart, info)
  }

  const calcTrack = (match: IMatch, track: string) => {
    let info: ITrackInfo

    if (trackInfo.has(track)) {
      info = trackInfo.get(track) as ITrackInfo
    } else {
      info = {
        id: '',
        name: track,
        count: 0,
        winCount: 0,
        min: Number.MAX_SAFE_INTEGER,
        matchIds: [],
      }
    }

    info.id = match.trackId
    info.count += 1
    info.matchIds.push(match.matchId)

    if (match.player.matchWin === '1') {
      info.winCount += 1
    }

    const matchTime = Number(match.player.matchTime)

    if (matchTime !== 0 && info.min > matchTime) {
      info.min = matchTime
    }

    trackInfo.set(track, info)
  }

  matches.forEach((match) => {
    const rank = Number(match.player.matchRank)
    ranks.unshift(rank >= 8 ? 8 : rank < 1 ? 1 : rank)

    const kart = (
      KartInfo.find((info) => info.id === match.player.kart) as IInfo
    ).name

    const track = (TrackInfo.find((info) => info.id === match.trackId) as IInfo)
      .name as string

    calcThings(match, track, rank, kart)
    calcKart(match, kart, track)
    calcTrack(match, track)
  })

  kartInfo.forEach((value) => {
    value.map.sort((a: ITrackRecord, b: ITrackRecord) => a.record - b.record)

    if (value.map.length > 4) {
      value.map.splice(4, value.map.length)
    }
  })

  const finalKartInfo = Array.from(kartInfo.values()).sort(
    (a, b) => b.count - a.count,
  )

  const finalTrackInfo = Array.from(trackInfo.values()).sort(
    (a, b) => b.count - a.count,
  )

  dispatch(
    home({
      id: data.userInfo.accessId,
      kart: finalKartInfo,
      track: finalTrackInfo,
    }),
  )

  const winRate = Math.round((winCnt / matches.length) * 100)
  const noRetiredRate = 100 - Math.round((retireCnt / matches.length) * 100)

  const winRateData = {
    title: '승률',
    data: [winRate, 100 - winRate],
    backgroundColor: 'rgba(1,119,255, 1)',
    text: `${winRate}%`,
    textColor: 'rgba(1,119,255, 1)',
  }

  const noRetiredData = {
    title: '완주율',
    data: [noRetiredRate, 100 - noRetiredRate],
    backgroundColor: 'rgba(155,214,40, 1)',
    text: `${noRetiredRate}%`,
    textColor: 'rgba(155,214,40, 1)',
  }

  const retiredData = {
    title: '리타이어율',
    data: [100 - noRetiredRate, noRetiredRate],
    backgroundColor: 'rgba(246,36,88, 1)',
    text: `${100 - noRetiredRate}%`,
    textColor: 'rgba(246,36,88, 1)',
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
        nickname={nickname}
        character={data.data.matches[0].matches[0].character}
        refetch={refetch}
      />
      <Container>
        <Card point="종합" title="전적">
          <ChartWrapper>
            <>
              <Donut {...winRateData} />
              <Donut {...noRetiredData} />
              <Donut {...retiredData} />
            </>
          </ChartWrapper>
          <Mode>
            <ModeText className="blue">최다주행</ModeText>{' '}
            <ModeText>모드</ModeText>
            <ModeText className="rank">통합</ModeText>
          </Mode>
        </Card>
        <Card point="순위변동" title="추이">
          <LineCard data={ranksPart} />
        </Card>
        <Card point="응원" title="한마디">
          <Cheer />
        </Card>
      </Container>
      <Box>
        <Record>
          <Tab />
        </Record>
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
  margin: auto;
  padding-bottom: 100px;
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

const CardSection = styled.section`
  display: flex;
`

const ChartWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
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

const Mode = styled.div`
  position: relative;
  margin: 8px;
  padding: 8px;
  border-top: 1px solid #f2f2f2;
  line-height: 30px;
`

const ModeText = styled.span`
  font-size: 14px;

  &.blue {
    color: var(--blue);
  }

  &.rank {
    position: absolute;
    right: 8px;
    font-size: 20px;
    font-weight: 500;
  }
`
