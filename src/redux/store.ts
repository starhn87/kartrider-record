import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import slice from './slice'

const store = configureStore({
  reducer: {
    user: slice,
  },
})

export type AppState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
