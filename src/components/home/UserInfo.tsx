import React, { useState } from 'react'
import styled from '@emotion/styled'
import { UserInfoProps } from '../../interface'
import { gameType, MATCH_TYPE } from '../../redux/slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { MdPerson, MdPeople } from 'react-icons/md'

const ICONS = [<MdPerson />, <MdPeople />]

export default function UserInfo({
  nickname,
  character,
  refetch,
}: UserInfoProps) {
  const dispatch = useAppDispatch()
  const matchType = useAppSelector((state) => state.user.gameType)
  const [selected, setSelected] = useState(matchType)

  const onClick = (key: keyof typeof MATCH_TYPE) => {
    setSelected(key)
    dispatch(gameType(key))
  }

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
          <Buttons>
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
            <ActionBox>
              <Refresh onClick={() => refetch()}>전적 갱신</Refresh>
            </ActionBox>
          </Buttons>
        </Box>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 175px;
  padding-top: 26px;
  background-color: white;
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

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1px;
`

const Icon = styled.div`
  margin-right: 5px;
  font-size: 18px;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
`

const ActionBox = styled.div`
  position: relative;
  display: inline-block;
  margin: 19px 10px 0 10px;
`

const Refresh = styled.span`
  display: inline-block;
  width: 82px;
  margin-right: 10px;
  line-height: 25px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  border: 0.7px solid var(--black);
  border-radius: 15px;

  &:hover {
    cursor: pointer;
  }
`
