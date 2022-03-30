import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from '@emotion/styled'
import { IHeaders, ISort, ITrackDetail, TrackTableProps } from '../../interface'
import TrackTableTr from './TrackTableTr'
import { v4 as uuid } from 'uuid'

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
  const observer = useRef<IntersectionObserver | null>(null)

  const sortedTracks = tracks?.sort((a: ITrackDetail, b: ITrackDetail) => {
    if (sort.seq === 'asc') {
      return a[sort.standard] > b[sort.standard] ? 1 : -1
    }

    return b[sort.standard] > a[sort.standard] ? 1 : -1
  })

  const onClick = (standard: keyof ITrackDetail) => {
    if (sort.standard === standard) {
      if (sort.seq === 'asc') {
        setSort((prev: ISort) => ({
          ...prev,
          seq: 'desc',
        }))
      } else {
        setSort((prev: ISort) => ({
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
      if (tracks!.length > page * 30) {
        setPage((prev) => prev + 1)
      }
    }
  }

  const updateObserver = () => {
    const footer = document.querySelector('footer')

    if (tracks && footer) {
      observer.current = new IntersectionObserver(onIntersect, {
        threshold: 0.9,
      })

      observer.current.observe(footer)
    }
  }

  useEffect(() => {
    updateObserver()

    return () => {
      observer.current && observer.current.disconnect()
    }
  }, [page])

  useEffect(() => {
    setPage(1)
    updateObserver()

    return () => {
      observer.current && observer.current.disconnect()
    }
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
          <TrackTableTr
            key={uuid()}
            track={track}
            index={index}
            totalCount={totalCount!}
            sort={sort}
          />
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
