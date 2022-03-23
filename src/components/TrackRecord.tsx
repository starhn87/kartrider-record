import styled from '@emotion/styled'
import React, { ChangeEvent, memo, useState } from 'react'
import { KartRecordProps } from '../interface'
import { useAppSelector } from '../redux/store'
import { formatTime } from '../util'
import {
  TabContent,
  Table,
  TableBox,
  TabTitle,
  Td,
  Th,
  Thead,
  TopContent,
  TopTitle,
  Tr,
} from './KartRecord'

export default memo(function TrackRecord({
  onTrackError,
}: Pick<KartRecordProps, 'onTrackError'>) {
  const trackInfo = useAppSelector((state) => state.user.track)
  const [selected, setSelected] = useState(0)

  return (
    <TabContent>
      <TabTitle>
        <span>트랙</span> 전적
      </TabTitle>
      {/* <TopContent>
        <TopTitle>
          {trackInfo[selected].name}
          <Dist>&nbsp;&nbsp;기록분포</Dist>
        </TopTitle>
      </TopContent> */}
      <TableBox>
        <Table>
          <Thead>
            <tr>
              <Th>선택</Th>
              <Th>트랙</Th>
              <Th>횟수</Th>
              <Th>승률</Th>
              <Th>기록</Th>
            </tr>
          </Thead>
          <tbody>
            {trackInfo.map((track, index) => (
              <Tr
                key={track.id}
                className={`${selected === index ? 'active' : ''}`}
              >
                <Td>
                  <input
                    type="radio"
                    value={index}
                    checked={selected === index}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSelected(Number(e.target.value))
                    }
                  ></input>
                </Td>
                <Td className="left">
                  <img
                    // src={`https://s3-ap-northeast-1.amazonaws.com/solution-userstats/kartimg/Category/${track.id}_1.png`}
                    src="https://s3-ap-northeast-1.amazonaws.com/solution-userstats/kartimg/Category/unknown_1.png"
                    alt="트랙 이미지"
                    onError={onTrackError}
                    height={27}
                  />
                  &nbsp; {track.name}
                </Td>
                <Td>{track.count}</Td>
                <Td>{`${Math.round(
                  (track.winCount / track.count) * 100,
                )}%`}</Td>
                <Td>
                  {track.min === Number.MAX_SAFE_INTEGER
                    ? '-'
                    : formatTime(track.min)}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableBox>
    </TabContent>
  )
})

const Dist = styled.span`
  color: var(--gray);
`
