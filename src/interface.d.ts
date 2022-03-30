import { MATCH_TYPE } from './redux/slice'

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

export interface IKartInfo {
  id: string
  map: ITrackRecord[]
  name: string
  count: number
  winCount: number
  retireCount: number
}

export interface ITrackRecord {
  name: string
  id: string
  record: number
}

export interface ITrackInfo {
  id: string
  name: string
  matchIds: string[]
  count: number
  winCount: number
  min: number
}

export interface ITrackRank {
  totalCount: number
  tracks: ITrackDetail[]
}

export interface ITrackDetail {
  name: string
  count: number
  retireCount: number
  bestRecord: number
  bestRider: string
  kartId: string
}

export interface IComment {
  [key: string]: {
    comment: string
    timestamp: number
  }
}

export interface IHeaders {
  name: string
  standard: keyof ITrackDetail
}

export interface ISort {
  standard: keyof ITrackDetail
  seq: 'asc' | 'desc'
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
  text: string
  textColor: string
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
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<
      {
        userInfo: any
        data: any
      } | null,
      unknown
    >
  >
}

export interface KartRecordProps {
  onKartError: (e: SyntheticEvent<HTMLImageElement>) => void
  onTrackError: (e: SyntheticEvent<HTMLImageElement>) => void
}

export interface IndicatorGuideProps {
  onClose: () => void
}

export interface TrackTableProps {
  tracks: ITrackDetail[] | undefined
  totalCount: number | undefined
  sort: ISort
  setSort: Dispatch<SetStateAction<ISort>>
}

export interface TrackTableTrProps {
  track: ITrackDetail
  index: number
  totalCount: number
  sort: ISort
}

export interface MatchTypeSwitchProps {
  selected: keyof typeof MATCH_TYPE
  onClick: (type: keyof typeof MATCH_TYPE) => void
}
