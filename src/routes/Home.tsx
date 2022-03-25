import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { useQuery } from 'react-query'
import { searchApi } from '../api'
import UserInfo from '../components/home/UserInfo'
import { MdInfo } from 'react-icons/md'
import Card from '../components/home/Card'
import Loading from '../components/common/Loading'
import Donut from '../components/home/Donut'
import LineCard from '../components/home/LineCard'
import Match from '../components/home/Match'
import { home, reset } from '../redux/slice'
import Tab from '../components/home/Tab'
import { shallowEqual } from 'react-redux'
import Cheer from '../components/home/Cheer'
import Default from '../components/home/Default'
import HelmetWrapper from '../components/common/Helmet'
import ToggleSwitch from '../components/ToggleSwitch'
import { IRecord } from '../interface'

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
      retry: false,
      onError: () => {
        dispatch(reset())
        alert('일치하는 유저가 없습니다.')
      },
    },
  )
  const [page, setPage] = useState(1)
  const [checked, setChecked] = useState(true)
  const [matches, setMatches] = useState<IRecord[]>([])

  const handleLocalStorage = () => {
    if (!nickname) {
      return
    }

    const history: string[] = JSON.parse(
      localStorage.getItem('history') || '[]',
    )

    const idx = history.findIndex((hist) => hist === nickname)

    if (idx >= 0) {
      history.splice(idx, 1)
    } else if (history.length === 3) {
      history.pop()
    }

    history.unshift(nickname)
    localStorage.setItem('history', JSON.stringify(history))
  }

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      if (data!.record.length > page * 50) {
        setPage((prev) => prev + 1)
      }
    }
  }

  const onToggle = () => {
    if (checked) {
      const filteredMatches = matches?.filter((match) => !match.retired)
      setMatches(filteredMatches)
    } else {
      setMatches(data!.record)
    }

    setChecked((prev) => !prev)
  }

  useEffect(() => {
    const footer = document.querySelector('footer')
    let observer: IntersectionObserver

    setChecked(true)
    setPage(1)
    handleLocalStorage()

    if (data) {
      setMatches(data.record)

      if (footer) {
        let observer = new IntersectionObserver(onIntersect, {
          rootMargin: '0px 0px 150px 0px',
          threshold: 0.9,
        })

        observer.observe(footer)
      }

      dispatch(
        home({
          id: data.userId,
          kart: data.finalKartInfo,
          track: data.finalTrackInfo,
        }),
      )
    }

    return () => observer && observer.disconnect()
  }, [data])

  if (isFetching) {
    return (
      <PageWrapper>
        <HelmetWrapper content="홈 | TMI" />
        <Loading />
      </PageWrapper>
    )
  } else if (!data) {
    return (
      <DefaultPageWrapper>
        <HelmetWrapper content="홈 | TMI" />
        <Default />
      </DefaultPageWrapper>
    )
  }

  return (
    <PageWrapper>
      <HelmetWrapper content="홈 | TMI" />
      <Info>
        <MdInfo style={{ marginRight: 5 }} />
        <span>
          카트라이더 매치데이터는 최근 1년치 데이터만 확인할 수 있습니다
        </span>
      </Info>
      <UserInfo
        nickname={nickname}
        character={data.character}
        refetch={refetch}
      />
      <Container>
        <Card point="종합" title="전적">
          <Detail>{`${data.record.length}전 ${data.winCnt}승 ${
            data.record.length - data.winCnt
          }패`}</Detail>
          <ChartWrapper>
            <Donut {...data.winRateData} />
            <Donut {...data.noRetiredData} />
            <Donut {...data.retiredData} />
          </ChartWrapper>
          <Mode>
            <ModeText className="blue">최다주행</ModeText>{' '}
            <ModeText>모드</ModeText>
            <ModeText className="rank">통합</ModeText>
          </Mode>
        </Card>
        <Card point="순위변동" title="추이">
          <Detail>
            {`지난 ${data.record.length}경기`}{' '}
            <span className="blue">{`${data.totalAvgRank}위`}</span>{' '}
            {`최근 ${data.ranksPart.length}경기`}{' '}
            <span className="blue">{`${data.recentAvgRank}위`}</span>{' '}
          </Detail>
          <LineCard data={data.ranksPart} />
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
          <RetireBox>
            <RetireText>리타이어 노출</RetireText>
            <ToggleSwitch checked={checked} onToggle={onToggle} />
          </RetireBox>
          {matches &&
            matches
              .slice(0, page * 50)
              .map((match) => <Match key={match.matchId} data={match} />)}
        </Record>
      </Box>
    </PageWrapper>
  )
}

export const PageWrapper = styled.section`
  width: 1000px;
  margin: auto;
  padding-bottom: 100px;

  @media (min-width: 1630px) {
    width: 1300px;
  }
`

const DefaultPageWrapper = styled.section`
  width: 100%;
  min-width: 1300px;
`

const Info = styled.article`
  display: flex;
  width: 100%;
  padding-bottom: 15px;
  align-items: center;
  font-size: 12px;
`

const Container = styled.section`
  display: grid;
  width: 100%;
  margin-top: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
`

const ChartWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
`

const Box = styled.section`
  display: grid;
  margin-top: 20px;
  grid-template-columns: 1fr 2fr;
`

const Record = styled.article`
  :not(:last-child) {
    margin-right: 10px;
  }
`

const Mode = styled.article`
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
    font-weight: bold;
  }
`

const RetireBox = styled.article`
  display: flex;
  height: 38px;
  padding-right: 2px;
  justify-content: flex-end;
  align-items: center;
`

const RetireText = styled.span`
  height: 19px;
  margin-right: 7px;
  font-size: 12px;
`

const Detail = styled.p`
  position: absolute;
  top: 12px;
  right: 20px;
  font-size: 12px;
  font-weight: bold;

  span.blue {
    color: var(--blue);
  }
`
