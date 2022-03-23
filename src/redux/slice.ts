import { createSlice } from '@reduxjs/toolkit'
import { IKartInfo, ITrackInfo } from '../interface'

interface IUser {
  id: string
  nickname: string
  kart: IKartInfo[]
  track: ITrackInfo[]
}

const initialState: IUser = {
  id: '',
  nickname: '',
  kart: [],
  track: [],
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    nickname: (state, action) => {
      state.nickname = action.payload
    },
    userId: (state, action) => {
      state.id = action.payload
    },
    kart: (state, action) => {
      state.kart = action.payload
    },
    track: (state, action) => {
      state.track = action.payload
    },
  },
})

export const { userId, nickname, kart, track } = user.actions

export default user.reducer
