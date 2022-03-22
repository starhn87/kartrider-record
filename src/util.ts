import { differenceInDays, differenceInHours } from 'date-fns'

export function formatTime(millisec: number) {
  const min = Math.floor(millisec / 1000 / 60)
  const sec = Math.floor((millisec / 1000) % 60) / 1
  const milli = Math.round((((millisec / 1000) % 60) % 1) * 100)

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
