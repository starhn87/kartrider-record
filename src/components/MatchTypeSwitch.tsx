import React from 'react'
import styled from '@emotion/styled'
import { MATCH_TYPE } from '../redux/slice'
import { ICONS } from './home/UserInfo'
import { MatchTypeSwitchProps } from '../interface'

export default function MatchTypeSwitch({
  selected,
  onClick,
}: MatchTypeSwitchProps) {
  return (
    <MatchTypeBox>
      {Object.keys(MATCH_TYPE).map((key, index) => (
        <MatchType
          key={key}
          className={`${selected === key ? 'active' : ''}`}
          onClick={() => onClick(key as keyof typeof MATCH_TYPE)}
        >
          <ContentBox>
            <Icon>{ICONS[index]}</Icon>
            {MATCH_TYPE[key as keyof typeof MATCH_TYPE]}
          </ContentBox>
        </MatchType>
      ))}
    </MatchTypeBox>
  )
}

const MatchTypeBox = styled.article`
  display: inline-block;
  overflow: hidden;
  margin-right: 15px;
  margin-top: 20px;
  padding: 0;
  border-radius: 5px;
  border: 1px solid var(--blue);
`

const MatchType = styled.button`
  display: inline-block;
  width: 100px;
  height: 29px;
  margin: 0;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
  vertical-align: middle;
  text-align: center;
  background-color: transparent;
  color: var(--blue);

  &.active {
    background-color: var(--blue);
    color: white;
  }
`

const ContentBox = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1px;
`

const Icon = styled.div`
  margin-right: 5px;
  font-size: 18px;
`
