import React, { ChangeEvent, FormEvent, useState } from 'react'
import styled from '@emotion/styled'
import { nickname } from '../../redux/slice'
import { useAppDispatch } from '../../redux/store'
import { v4 as uuid } from 'uuid'

export default function Default() {
  const [value, setValue] = useState('')
  const [isFocusing, setIsFocusing] = useState(false)
  const [isMounted, SetIsMouted] = useState(false)
  const dispatch = useAppDispatch()
  const history: string[] = JSON.parse(localStorage.getItem('history') || '[]')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(nickname(value))
  }

  const handleClick = (hist: string) => {
    dispatch(nickname(hist))
  }

  const onBlur = () => {
    SetIsMouted(true)
    setTimeout(() => {
      setIsFocusing(false)
      SetIsMouted(false)
    }, 1000)
  }

  return (
    <Wrapper>
      <Main>
        <Inner>
          <HomeTitle>
            <MainMessage>
              <SubTitle>넥슨 오픈 API 기반</SubTitle>
              <Title>카트라이더 전적 검색</Title>
              <MainCopy>
                <Copy>사회적 거리두기</Copy>
              </MainCopy>
            </MainMessage>
            <SearchBox>
              <form onSubmit={onSubmit}>
                <Search
                  value={value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.value)
                  }
                  placeholder="카트라이더 닉네임을 입력"
                  onFocus={() => setIsFocusing(true)}
                  onBlur={() => onBlur()}
                />
                <Button type="submit">
                  <ButtonImg
                    src="https://tmi.nexon.com/img/assets/tmi_logo_default.svg"
                    alt="검색 버튼"
                  />
                </Button>
              </form>
              {isFocusing && (
                <HistoryBox className={`${isMounted ? 'opened' : ''}`}>
                  <List>
                    {history.map((hist) => (
                      <Item
                        key={uuid()}
                        onMouseDown={() => {
                          handleClick(hist)
                        }}
                      >
                        <History>{hist}</History>
                      </Item>
                    ))}
                  </List>
                </HistoryBox>
              )}
            </SearchBox>
          </HomeTitle>
          <LeftImg
            src="https://tmi.nexon.com/img/assets/covid_left.png"
            alt="마스크 쓴 배찌"
          />
          <RightImg
            src="https://tmi.nexon.com/img/assets/covid_right.png"
            alt="마스크 쓴 다오"
          />
          <LeftBg />
          <RightBg />
        </Inner>
      </Main>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: block;
  padding-bottom: 30px;
`

const Main = styled.div`
  position: relative;
  overflow: hidden;
  margin-top: -55px;
  text-align: center;
  background-image: url('https://tmi.nexon.com/img/main_bg1.png');
  background-size: cover;
  background-position: 50%;
`

const Inner = styled.div`
  width: 1000px;
  margin: auto;
`

const HomeTitle = styled.section`
  position: relative;
  height: 655px;
  z-index: 2;
`

const MainMessage = styled.article`
  padding-top: 200px;
  animation: showing 1s;

  @keyframes showing {
    from {
      padding-top: 250px;
      opacity: 0;
    }
    to {
      padding-top: 200px;
      opacity: 1;
    }
  }
`

const SubTitle = styled.p`
  font-size: 28px;
  line-height: 28px;
  font-weight: 400;
  color: white;
`

const Title = styled.p`
  font-size: 40px;
  font-weight: 400;
  color: white;
`

const MainCopy = styled.article`
  display: inline-block;
  width: 280px;
  margin-top: 5px;
  line-height: 26px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
`

const Copy = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: white;
`

const SearchBox = styled.article`
  position: absolute;
  width: 500px;
  height: 67px;
  top: 62%;
  left: 50%;
  padding: 5px;
  transform: translate(-50%, -50%);
  background: transparent;
  box-sizing: border-box;
  border-radius: 33.5px;
  border: 4px solid #fff;
  animation: desc 1s;

  @media (min-width: 1630px) {
    width: 670px;
    animation: asc 1s;
  }

  @keyframes asc {
    from {
      width: 500px;
    }
    to {
      width: 670px;
    }
  }

  @keyframes desc {
    from {
      width: 670px;
    }
    to {
      width: 500px;
    }
  }
`

const Search = styled.input`
  position: absolute;
  display: block;
  width: 600px;
  height: 44px;
  top: 7px;
  padding: 0 25px;
  line-height: 44px;
  outline: 0;
  border: 0;
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  background: transparent;
  animation: fadein 1s;

  &::placeholder {
    color: rgba(255, 250, 250, 0.6);
  }
`

const Button = styled.button`
  position: absolute;
  width: 100px;
  height: 44px;
  top: 7px;
  right: 0;
  line-height: 44px;
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  background-color: transparent;
  border: none;
`

const ButtonImg = styled.img`
  width: 45px;
`

const LeftImg = styled.img`
  position: absolute;
  width: 380px;
  top: 200px;
  left: 0;
  margin-left: 50px;
  transition: all 0.5s;
  z-index: 1;
  animation: left 1s;

  @keyframes left {
    from {
      margin-left: -180px;
    }
    to {
      margin-left: 50px;
    }
  }
`

const RightImg = styled.img`
  position: absolute;
  width: 380px;
  top: 200px;
  right: 0;
  margin-right: 50px;
  transition: all 0.5s;
  z-index: 1;
  animation: right 1s;

  @keyframes right {
    from {
      margin-right: -180px;
    }
    to {
      margin-right: 50px;
    }
  }
`

const LeftBg = styled.span`
  position: absolute;
  width: 447px;
  height: 296px;
  top: 200px;
  left: 0;
  margin-left: 50px;
  z-index: 87;
  background-image: url('https://tmi.nexon.com/img/main_left_bg.png');
  background-size: cover;
  background-position: 50%;
  z-index: 1;
  animation: left 1s;

  @keyframes left {
    from {
      margin-left: -250px;
    }
    to {
      margin-left: 50px;
    }
  }
`

const RightBg = styled.span`
  position: absolute;
  width: 527px;
  height: 317px;
  top: 200px;
  right: 0;
  margin-right: 50px;
  z-index: 87;
  background-image: url('https://tmi.nexon.com/img/main_right_bg.png');
  background-size: cover;
  background-position: 50%;
  z-index: 1;
  animation: right 1s;

  @keyframes right {
    from {
      margin-right: -250px;
    }
    to {
      margin-right: 50px;
    }
  }
`

const HistoryBox = styled.article`
  position: relative;
  display: flex;
  width: 450px;
  top: 117%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
  line-height: 35px;
  animation: fadein 1s;
  opacity: 1;

  &.opened {
    animation: fadeout 1s;
  }

  @media (min-width: 1630px) {
    width: 620px;
  }
`

const List = styled.ul`
  width: 100%;
`

const Item = styled.li`
  width: 100%;
  padding: 0 15px;
  line-height: 50px;
  text-align: left;
  overflow-x: hidden;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.4);
  }
`

const History = styled.span`
  width: 100%;
`
