import { createSlice } from '@reduxjs/toolkit'

interface IUser {
  id: number | null
  name: string | null
}

const initialState: IUser = {
  id: null,
  name: null,
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default user.reducer
