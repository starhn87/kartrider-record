import styled from '@emotion/styled'
import React, { useState } from 'react'

interface IndicatorGuideProps {
  onClose: () => void
}

export default function IndicatorGuide({ onClose }: IndicatorGuideProps) {
  const [mounted, setMounted] = useState(false)

  const onCLick = () => {
    setMounted(true)
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <Wrapper className={`${mounted ? 'opened' : ''}`}>
      <div>
        <Title>
          지표 가이드
          <Xbutton
            src="https://tmi.nexon.com/img/assets/icon_close_small.png"
            alt="X 버튼"
            onClick={() => onCLick()}
          />
        </Title>
        <SubTitle>TMI 지표</SubTitle>
        <Container>
          <Name>
            <p>사용률</p>
            <p>리타이어율</p>
            <p>베스트 라이더</p>
            <p>베스트 레코드</p>
            <p>베스트 카트</p>
          </Name>
          <Desc>
            <p>전체 유저 중 해당 트랙을 이용한 유저의 비율입니다.</p>
            <p>해당 트랙에서의 리타이어율 입니다.</p>
            <p>해당 트랙의 최고 기록을 기록한 라이더의 닉네임입니다.</p>
            <p>해당 트랙의 최고기록입니다.</p>
            <p>해당 트랙의 최고 기록을 기록한 카트의 이름입니다.</p>
          </Desc>
        </Container>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  width: 570px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  z-index: 5;
  opacity: 1;
  margin-top: 12px;
  padding-bottom: 23px;
  font-weight: 300;
  letter-spacing: -1px;
  animation: fadein 1s;
  opacity: 1;

  &.opened {
    opacity: 0;
    animation: fadeout 1s;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

const Title = styled.h4`
  position: relative;
  padding-left: 23px;
  line-height: 46px;
  font-size: 15px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.5);
`

const SubTitle = styled.h5`
  padding-left: 23px;
  line-height: 50px;
  font-size: 12px;
  color: #00f0ff;
`

const Container = styled.div`
  display: flex;
  line-height: 15px;
  font-size: 11px;
  color: #00f0ff;
`

const Name = styled.div`
  flex: 0.3;
  padding-left: 30px;
`

const Desc = styled.div`
  flex: 0.7;
`

const Xbutton = styled.img`
  position: absolute;
  top: 50%;
  margin-top: -7px;
  right: 23px;
  width: 14px;
  height: 14px;

  &:hover {
    cursor: pointer;
  }
`
