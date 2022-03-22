import { MATCH_TYPE } from './components/UserInfo'

export interface IInfo {
  id: string
  name: string
}

export interface IMatch {
  accountNo: string
  matchId: string
  matchType: string
  teamId: string
  character: string
  startTime: string
  endTime: string
  channelName: string
  trackId: string
  playerCount: number
  matchResult: string
  seasonType: string
  player: IPlayer
}

export interface IPlayer {
  accountNo: string
  characterName: string
  character: string
  kart: string
  license: string
  pet: string
  flyingPet: string
  partsEngine: string
  partsHandle: string
  partsWheel: string
  partsKit: string
  rankinggrade2: string
  matchRank: string
  matchRetired: string
  matchWin: string
  matchTime: string
}

export interface IRecord {
  matchId: string
  track: string
  rank: number
  playerCount: number
  kart: string
  playTime: string
  timeDiff: string
  retired: boolean
}

export interface CardProps {
  title: string
  point: string
  children?: ReactNode
}

export interface DonutProps {
  title: string
  data: number[]
  backgroundColor: string
}

export interface LineCardProps {
  data: number[]
}

export interface MatchProps {
  data: IRecord
}

export interface MoreProps {
  matchId: string
}

export interface UserInfoProps {
  nickname: string
  character: string
  matchType: keyof typeof MATCH_TYPE
}
