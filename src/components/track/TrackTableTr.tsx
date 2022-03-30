import React, { memo } from 'react'
import styled from '@emotion/styled'
import { TrackTableTrProps } from '../../interface'
import { formatTime, onError } from '../../util'
import { v4 as uuid } from 'uuid'

export default memo(function TrackTableTr({
  track,
  index,
  totalCount,
  sort,
}: TrackTableTrProps) {
  return (
    <Tr key={uuid()}>
      <Td>{index + 1}</Td>
      <Td className={`td_track ${'name' === sort.standard ? 'blue' : ''}`}>
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
  )
})

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
