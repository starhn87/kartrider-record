import { createSlice } from '@reduxjs/toolkit'

interface IUser {
  id: string
  nickname: string
}

const initialState: IUser = {
  id: '',
  nickname: '',
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
  },
})

export const { userId, nickname } = user.actions

export default user.reducer
