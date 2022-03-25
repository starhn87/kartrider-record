import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import styled from '@emotion/styled'
import { formatTime, onError } from '../../util'
import { v4 as uuid } from 'uuid'
import { ITrackDetail } from '../../interface'
import { ISort } from '../../routes/Track'

interface TrackTableProps {
  tracks: ITrackDetail[] | undefined
  totalCount: number | undefined
  sort: ISort
  setSort: Dispatch<SetStateAction<ISort>>
}

interface IHeaders {
  name: string
  standard: keyof ITrackDetail
}

const HEADERS: IHeaders[] = [
  {
    name: '트랙이름',
    standard: 'name',
  },
  {
    name: '사용률',
    standard: 'count',
  },
  {
    name: '리타이어율',
    standard: 'retireCount',
  },
  {
    name: '베스트 라이더',
    standard: 'bestRider',
  },
  {
    name: '베스트 레코드',
    standard: 'bestRecord',
  },
]

export default memo(function TrackTable({
  tracks,
  totalCount,
  sort,
  setSort,
}: TrackTableProps) {
  const [page, setPage] = useState(1)
  const sortedTracks = tracks?.sort((a: ITrackDetail, b: ITrackDetail) => {
    if (sort.seq === 'asc') {
      return a[sort.standard] > b[sort.standard] ? 1 : -1
    }

    return b[sort.standard] > a[sort.standard] ? 1 : -1
  })

  const onClick = (standard: keyof ITrackDetail) => {
    if (sort.standard === standard) {
      if (sort.seq === 'asc') {
        setSort((prev) => ({
          ...prev,
          seq: 'desc',
        }))
      } else {
        setSort((prev) => ({
          ...prev,
          seq: 'asc',
        }))
      }
    } else {
      setSort({
        standard,
        seq: 'desc',
      })
    }
  }

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      if (tracks!.length > page * 30) setPage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    setPage(1)

    const footer = document.querySelector('footer')
    let observer: IntersectionObserver

    if (tracks && footer) {
      let observer = new IntersectionObserver(onIntersect, {
        threshold: 0.9,
      })

      observer.observe(footer)
    }

    return () => observer && observer.disconnect()
  }, [tracks])

  return (
    <Table>
      <Thead>
        <tr>
          <Th>
            <span>#</span>
          </Th>
          {HEADERS.map((header) => (
            <Th key={uuid()}>
              <ThBox>
                <TMI
                  src="	https://tmi.nexon.com/img/assets/icon_tmi.png"
                  alt="TMI"
                />
                <Column>{header.name}</Column>
                <Sort
                  className={`${
                    header.standard === sort.standard
                      ? sort.seq === 'asc'
                        ? 'asc'
                        : 'desc'
                      : ''
                  }`}
                  onClick={() => onClick(header.standard)}
                />
              </ThBox>
            </Th>
          ))}

          <Th>
            <ThBox>
              <TMI
                src="	https://tmi.nexon.com/img/assets/icon_tmi.png"
                alt="TMI"
              />
              <Column>사용 카트</Column>
            </ThBox>
          </Th>
        </tr>
      </Thead>
      <Tbody>
        {sortedTracks?.slice(0, page * 30).map((track, index) => (
          <Tr key={uuid()}>
            <Td>{index + 1}</Td>
            <Td
              className={`td_track ${'name' === sort.standard ? 'blue' : ''}`}
            >
              <div>
                <img src="https://s3-ap-northeast-1.amazonaws.com/solution-userstats/kartimg/Category/unknown_1.png" />
                <span>{track.name}</span>
              </div>
            </Td>
            <Td
              className={`${'count' === sort.standard ? 'blue' : ''}`}
            >{`${Math.round((track.count / totalCount!) * 100)}%`}</Td>
            <Td
              className={`${'retireCount' === sort.standard ? 'blue' : ''}`}
            >{`${Math.round(
              (track.retireCount / (track.count + track.retireCount)) * 100,
            )}%`}</Td>
            <Td className={`${'bestRider' === sort.standard ? 'blue' : ''}`}>
              {track.bestRider}
            </Td>
            <Td className={`${'bestRecord' === sort.standard ? 'blue' : ''}`}>
              {track.bestRecord > 0 ? formatTime(track.bestRecord) : '-'}
            </Td>
            <Td>
              <KartImg
                src={`https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/${track.kartId}.png`}
                onError={onError}
                alt="카트 이미지"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
})

const Table = styled.table`
  width: 100%;
  text-align: center;
`

const Thead = styled.thead`
  color: var(--black);
  line-height: 62px;
`

const Th = styled.th`
  position: relative;
  font-size: 12px;

  :not(:last-child) {
    &::after {
      content: '';
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 30px;
      top: 18px;
      right: 0;
      background-color: #ccc;
    }
  }

  :first-of-type {
    overflow: hidden;
    width: 3vw;
    white-space: nowrap;
  }
`

const Column = styled.span`
  margin-right: 5px;
  font-size: 12px;
  font-weight: bold;
  vertical-align: middle;
`

const Tbody = styled.tbody`
  font-size: 14px;
  color: var(--black);
  line-height: 62px;
`

const Tr = styled.tr`
  :nth-of-type(even) {
    background-color: #fafafa;
  }

  &:hover {
    background-color: #f2f3f4;
    color: var(--blue);
  }
`

const Td = styled.td`
  &.td_track {
    width: 17vw;
    text-align: left;

    div {
      display: flex;
      overflow: hidden;
      align-items: center;
      white-space: nowrap;

      img {
        height: 35px;
        margin: 0 20px 0 30px;
      }

      span {
        font-size: 15px;
        font-weight: bold;
      }
    }
  }

  &.blue {
    color: var(--blue);
  }
`

const KartImg = styled.img`
  height: 35px;
  vertical-align: middle;
`

const ThBox = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Sort = styled.span`
  display: inline-block;
  height: 17px;
  width: 10px;
  background: url('https://tmi.nexon.com/img/btn_none.svg') no-repeat 0 0;

  &:hover {
    cursor: pointer;
  }

  &.desc {
    background: url('https://tmi.nexon.com/img/btn_desc.svg') no-repeat 0 0;
  }

  &.asc {
    background: url('https://tmi.nexon.com/img/btn_asc.svg') no-repeat 0 0;
  }
`

const TMI = styled.img`
  position: absolute;
  left: 50%;
  margin-top: -67.5px;
  margin-left: -14.5px;
`
