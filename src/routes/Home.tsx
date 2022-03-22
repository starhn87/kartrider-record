import styled from '@emotion/styled'
import React, { Suspense, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { useAppSelector } from '../redux/store'
import { useQuery } from 'react-query'
import { searchApi } from '../api'
import UserInfo from '../components/UserInfo'
import { MdInfo } from 'react-icons/md'
import Card from '../components/Card'
import { Doughnut, Line } from 'react-chartjs-2'

interface IMatch {
  accountNo: string
  matchId: string
  matchType: string
  teamId: string
  character: string
  startTime: string
  endTime: string
  channelName: string
  trackId: string
  playerCount: number
  matchResult: string
  seasonType: string
  player: {
    accountNo: string
    characterName: string
    character: string
    kart: string
    license: string
    pet: string
    flyingPet: string
    partsEngine: string
    partsHandle: string
    partsWheel: string
    partsKit: string
    rankinggrade2: string
    matchRank: string
    matchRetired: string
    matchWin: string
    matchTime: string
  }
}

export default function Home() {
  const nickname = useAppSelector((state) => state.user.nickname)
  const { data, isFetching } = useQuery(
    [nickname],
    () => searchApi.username(nickname),
    {
      staleTime: 60 * 1000,
      // keepPreviousData: true,
    },
  )

  if (isFetching || !data) {
    return <div>Loading...</div>
  }

  let retireCnt = 0
  let winCnt = 0
  const ranks: number[] = []
  const matches: IMatch[] = data.data.matches[0].matches
  console.log(matches)

  matches.forEach((match) => {
    if (match.player.matchRetired === '1') {
      retireCnt += 1
    }

    if (match.player.matchWin === '1') {
      winCnt += 1
    }

    const rank = Number(match.player.matchRank)
    ranks.unshift(rank >= 8 ? 8 : rank < 1 ? 1 : rank)
  })

  const winRate = Math.round((winCnt / matches.length) * 100)
  const noRetiredRate = 100 - Math.round((retireCnt / matches.length) * 100)

  const winRateData = {
    datasets: [
      {
        data: [winRate, 100 - winRate],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: ['rgba(1,119,255, 1)', 'rgba(235,235,235, 1)'],
        fill: true,
      },
    ],
  }

  const noRetiredData = {
    datasets: [
      {
        data: [noRetiredRate, 100 - noRetiredRate],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: ['rgba(155,214,40, 1)', 'rgba(235,235,235, 1)'],
        fill: true,
      },
    ],
  }

  const retiredData = {
    datasets: [
      {
        data: [100 - noRetiredRate, noRetiredRate],
        backgroundColor: ['rgba(246,36,88, 1)', 'rgba(235,235,235, 1)'],
        fill: false,
      },
    ],
  }

  const ranksPart = ranks.slice(
    ranks.length >= 50 ? ranks.length - 50 : 0,
    ranks.length,
  )

  const rankData = {
    labels: ranksPart,
    datasets: [
      {
        data: ranksPart,
        borderColor: 'rgba(1,119,255, 1)',
        borderWidth: 1.5,
        pointRadius: 1.5,
        pointBorderColor: 'rgba(1,119,255, 1)',
        pointColor: 'rgba(1,119,255, 1)',
        fill: false,
      },
    ],
  }

  console.log(rankData)

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
            <div>
              <p>승률</p>
              <Doughnut
                options={{
                  responsive: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
                data={winRateData}
                width={83}
                height={83}
              />
            </div>
            <div>
              <p>완주율</p>
              <Doughnut
                options={{
                  responsive: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
                data={noRetiredData}
                width={83}
                height={83}
              />
            </div>
            <div>
              <p>리타이어율</p>
              <Doughnut
                options={{
                  responsive: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
                data={retiredData}
                width={83}
                height={83}
              />
            </div>
          </ChartWrapper>
        </Card>
        <Card point="순위변동" title="추이">
          <div>
            <Line
              options={{
                responsive: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                layout: {
                  padding: {
                    top: 10,
                    bottom: 10,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    reverse: true,
                    suggestedMin: 1,
                    suggestedMax: 8,
                  },
                },
              }}
              data={rankData}
            />
          </div>
        </Card>
        <Card point="응원" title="한마디" />
      </Container>
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
