import styled from '@emotion/styled'
import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react'
import { nickname } from '../redux/slice'
import { useAppDispatch } from '../redux/store'

export default function Default() {
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(nickname(value))
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
                />
                <Button type="submit">
                  <ButtonImg
                    src="https://tmi.nexon.com/img/assets/tmi_logo_default.svg"
                    alt="검색 버튼"
                  />
                </Button>
              </form>
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
  margin-top: -55px;
  text-align: center;
  background-image: url('https://tmi.nexon.com/img/main_bg1.png');
  background-size: cover;
  background-position: 50%;
  overflow: hidden;
`

const Inner = styled.div`
  width: 1000px;
  margin: auto;
`

const HomeTitle = styled.div`
  position: relative;
  height: 655px;
  z-index: 2;
`

const MainMessage = styled.div`
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

const MainCopy = styled.div`
  margin-top: 5px;
  display: inline-block;
  width: 280px;
  line-height: 26px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
`

const Copy = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: white;
`

const SearchBox = styled.div`
  width: 500px;
  position: absolute;
  top: 62%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 67px;
  background: transparent;
  box-sizing: border-box;
  border-radius: 33.5px;
  border: 4px solid #fff;
  padding: 5px;
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
      width: 680px;
    }
  }

  @keyframes desc {
    from {
      width: 680px;
    }
    to {
      width: 500px;
    }
  }
`

const Search = styled.input`
  position: absolute;
  top: 7px;
  width: 600px;
  height: 44px;
  line-height: 44px;
  outline: 0;
  border: 0;
  display: block;
  font-size: 24px;
  font-weight: 400;
  padding: 0 25px;
  color: #fff;
  background: transparent;
  opacity: 1;
  animation: fadein 1s;

  &::placeholder {
    color: rgba(255, 250, 250, 0.6);
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const Button = styled.button`
  position: absolute;
  width: 100px;
  top: 7px;
  right: 0;
  height: 44px;
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
  animation: left 1s linear;

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
  animation: right 1s linear;

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
  z-index: 87;
  margin-left: 50px;
  background-image: url('https://tmi.nexon.com/img/main_left_bg.png');
  background-size: cover;
  background-position: 50%;
  transition: all 0.3s ease-in-out;
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
  z-index: 87;
  margin-right: 50px;
  background-image: url('https://tmi.nexon.com/img/main_right_bg.png');
  background-size: cover;
  background-position: 50%;
  transition: all 0.3s ease-in-out;
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
