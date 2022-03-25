import React from 'react'
import styled from '@emotion/styled'

const Loading = () => {
  return (
    <Ring>
      LOADING
      <span></span>
    </Ring>
  )
}

const Ring = styled.div`
  position: fixed;
  width: 15rem;
  height: 15rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1rem solid #23a2f7;
  border-radius: 50%;
  text-align: center;
  line-height: 13.5rem;
  font-size: 2rem;
  font-weight: 1000;
  color: #23a2f7;
  letter-spacing: 0.3rem;
  z-index: 99999;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: -1rem;
    left: -1rem;
    border: 1rem solid transparent;
    border-top: 1rem solid #002473;
    border-right: 1rem solid #002473;
    border-radius: 50%;
    animation: animateA 3s linear infinite;
  }

  span {
    position: absolute;
    display: block;
    width: 50%;
    height: 0.4rem;
    top: calc(50% - 0.2rem);
    left: 50%;
    background: transparent;
    transform-origin: left;
    animation: animateB 3s linear infinite;

    &:before {
      content: '';
      position: absolute;
      width: 2rem;
      height: 2rem;
      top: 0rem;
      right: -1.4rem;
      border-radius: 50%;
      background: #002473;
    }
  }

  @keyframes animateA {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animateB {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(405deg);
    }
  }
`

export default Loading
