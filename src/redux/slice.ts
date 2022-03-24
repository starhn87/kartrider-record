import { createSlice } from '@reduxjs/toolkit'
import { IKartInfo, ITrackInfo } from '../interface'

export const MATCH_TYPE = {
  '7b9f0fd5377c38514dbb78ebe63ac6c3b81009d5a31dd569d1cff8f005aa881a': '개인전',
  effd66758144a29868663aa50e85d3d95c5bc0147d7fdb9802691c2087f3416e: '팀전',
}

interface IUser {
  id: string
  nickname: string
  kart: IKartInfo[]
  track: ITrackInfo[]
  gameType: keyof typeof MATCH_TYPE
}

const initialState: IUser = {
  id: '',
  nickname: '',
  kart: [],
  track: [],
  gameType: '7b9f0fd5377c38514dbb78ebe63ac6c3b81009d5a31dd569d1cff8f005aa881a',
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
    nickname: (state, action) => {
      state.nickname = action.payload
    },
    gameType: (state, action) => {
      state.gameType = action.payload
    },
    home: (state, action) => {
      state.id = action.payload.id
      state.kart = action.payload.kart
      state.track = action.payload.track
    },
  },
})

export const { gameType, nickname, home, reset } = user.actions

export default user.reducer
