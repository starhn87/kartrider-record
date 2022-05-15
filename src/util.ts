import { differenceInDays, differenceInHours } from 'date-fns'
import { SyntheticEvent } from 'react'

export function formatTime(millisec: number) {
  const min = Math.floor(millisec / 1000 / 60)
  const sec = Math.floor((millisec / 1000) % 60)
  const milli = Math.round((((millisec / 1000) % 60) * 100) / 100)

  return `${min}'${sec}'${milli}`
}

export function subDate(standard: string) {
  const date1 = new Date(standard)
  const date2 = new Date()

  const hourDiff = differenceInHours(date2, date1)

  if (hourDiff >= 24) {
    return `${differenceInDays(date2, date1)}일 전`
  }

  return `${hourDiff}시간 전`
}

export function onError(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.src = 'https://tmi.nexon.com/img/assets/empty_kart.png'
}
