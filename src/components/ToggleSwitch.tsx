import React from 'react'
import styled from '@emotion/styled'

interface ToggleSwitchProps {
  checked: boolean
  onToggle: () => void
}

export default function ToggleSwitch({ checked, onToggle }: ToggleSwitchProps) {
  return (
    <Label>
      <CheckBox type="checkbox" checked={checked} onChange={() => onToggle()} />
      <Slider />
    </Label>
  )
}

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 18px;
`

const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #f62459;
  }

  &:checked + span:before {
    transform: translateX(15px);
  }
`

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: '';
    width: 15px;
    height: 14px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`
