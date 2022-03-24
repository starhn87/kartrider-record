import styled from '@emotion/styled'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { matchApi } from '../api'
import Loading from '../components/Loading'
import { PageWrapper } from './Home'
import TrackTable from '../components/TrackTable'
import { ITrackDetail } from '../interface'
import IndicatorGuide from '../components/IndicatorGuide'

export interface ISort {
  standard: keyof ITrackDetail
  seq: 'asc' | 'desc'
}

export default function Track() {
  const { data, isFetching } = useQuery(['all'], () => matchApi.all(), {
    staleTime: 60 * 1000,
    retry: false,
  })
  const [tracks, setTracks] = useState<ITrackDetail[] | undefined>(
    data?.tracks || [],
  )
  const [value, setValue] = useState('')
  const [guide, setGuide] = useState(false)
  const [sort, setSort] = useState<ISort>({
    standard: 'count',
    seq: 'desc',
  })

  useEffect(() => {
    setTracks(data?.tracks)
  }, [data])

  if (isFetching || !data) {
    return <Loading />
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e

    setValue(value)

    const filteredTracks = data!.tracks.filter(
      (track) => track.bestRider.includes(value) || track.name.includes(value),
    )

    setTracks(filteredTracks)
  }

  return (
    <Wrapper>
      <Title>스피드개인전 트랙 순위</Title>
      <Line />
      <Section>
        <SearchBox>
          <form>
            <Search
              value={value}
              onChange={onChange}
              placeholder="트랙/베스트 라이더 검색"
            />
          </form>
          <Guide>
            스피드개인전 공방 기준 통계입니다.
            <GuideButton onClick={() => setGuide(true)}>
              지표 가이드
            </GuideButton>
          </Guide>
          {guide && <IndicatorGuide onClose={() => setGuide(false)} />}
        </SearchBox>
        <TrackTable
          tracks={tracks}
          totalCount={data.totalCount}
          sort={sort}
          setSort={setSort}
        />
      </Section>
    </Wrapper>
  )
}

const Wrapper = styled(PageWrapper)`
  padding-top: 50px;
`

const Title = styled.h1`
  font-size: 22px;
  font-weight: 400;
  padding-left: 10px;
  margin-bottom: 10px;
`

const Line = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  width: 35px;
  height: 3px;
  background-color: #1f334a;
`

const Section = styled.div`
  background-color: white;
`

const SearchBox = styled.div`
  position: relative;
  display: flex;
  height: 67px;
  padding-left: 25px;
  line-height: 67px;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
`

const Guide = styled.span`
  position: absolute;
  right: 10px;
  color: #6c7a89;
`

const GuideButton = styled.button`
  display: inline-block;
  width: 70px;
  font-size: 12px;
  text-align: center;
  text-decoration: none;
  color: var(--blue);
  background-color: transparent;
  line-height: 20px;
  border: 1px solid var(--blue);
  margin-left: 15px;

  &:hover {
    color: white;
    background-color: var(--blue);
  }
`

const Search = styled.input`
  box-sizing: border-box;
  display: inline-block;
  height: 36px;
  width: 241px;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
  border: 1px solid #ccc;
`
