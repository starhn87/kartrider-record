import styled from '@emotion/styled'
import React from 'react'
import { UserInfoProps } from '../interface'

export const MATCH_TYPE = {
  '7b9f0fd5377c38514dbb78ebe63ac6c3b81009d5a31dd569d1cff8f005aa881a': '개인전',
  effd66758144a29868663aa50e85d3d95c5bc0147d7fdb9802691c2087f3416e: '팀전',
}

export default function UserInfo({
  nickname,
  character,
  matchType,
}: UserInfoProps) {
  const decodedType = MATCH_TYPE[matchType]

  return (
    <Wrapper>
      <Container>
        <Img
          src={`https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/character/${character}.png`}
          alt="character"
          height={123}
        />
        <Box>
          <Name>{nickname}</Name>
          <MatchTypeBox>
            <MatchType className="active">개인전</MatchType>
            <MatchType>팀전</MatchType>
          </MatchTypeBox>
          <Refresh>전적 갱신</Refresh>
        </Box>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: white;
  position: relative;
  height: 175px;
  padding-top: 26px;
  background-color: rgba(0, 0, 0, 0.025);
  background-image: url('https://tmi.nexon.com/img/background_flag_w.png');
  background-size: cover;
  background-position: 50%;
  border-width: 1px 1px 1px 4px;
  border-style: solid;
  border-color: #f2f2f2 #f2f2f2 #f2f2f2 #07f;
  z-index: 2;
`

const Container = styled.section`
  display: flex;
  width: 100%;
`

const Img = styled.img``

const Box = styled.div`
  margin-left: 20px;
`

const Name = styled.h1`
  font-size: 45px;
`

const MatchTypeBox = styled.div`
  display: inline-block;
  overflow: hidden;
  margin-right: 15px;
  margin-top: 20px;
  border-radius: 5px;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--blue);
`

const MatchType = styled.button`
  vertical-align: middle;
  display: inline-block;
  width: 100px;
  height: 29px;
  font-size: 12px;
  font-weight: 400;
  padding: 0;
  margin: 0;
  text-align: center;
  background-color: transparent;
  color: var(--blue);

  &.active {
    background-color: var(--blue);
    color: white;
  }
`

const Refresh = styled.button`
  display: inline-block;
`
