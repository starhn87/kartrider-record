import { createSlice } from '@reduxjs/toolkit'

interface IUser {
  id: number | null
  nickname: string
}

const initialState: IUser = {
  id: null,
  nickname: '',
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    nickname: (state, action) => {
      state.nickname = action.payload
    },
    userInfo: (state, action) => {
      state.id = action.payload.id
      state.nickname = action.payload.nickname
    },
  },
})

export const { userInfo, nickname } = user.actions

export default user.reducer
