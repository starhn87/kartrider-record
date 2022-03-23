import axios from 'axios'
import { IPlayer } from './interface'

const api = axios.create({
  baseURL: '/api',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTU3Nzc5MzM1OSIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTM5MyIsIlgtQXBwLVJhdGUtTGltaXQiOiI1MDA6MTAiLCJuYmYiOjE2NDc3NjgwMzIsImV4cCI6MTY2MzMyMDAzMiwiaWF0IjoxNjQ3NzY4MDMyfQ.2k2Ww1aqGG0wKnPID7xTrz2igMCUywLtapw9zM6pRRQ',
  },
})

export const searchApi = {
  username: async (nickname: string) => {
    if (nickname.trim() === '') {
      return null
    }

    const userInfo = await (await api.get(`/users/nickname/${nickname}`)).data
    const { data } = await api.get(
      `/users/${userInfo.accessId}/matches?offset=0&limit=200`,
    )

    return {
      userInfo,
      data,
    }
  },
}

export const matchApi = {
  detail: async (matchId: string) => {
    const {
      data: { players },
    } = await api.get(`/matches/${matchId}`)

    players.sort(
      (a: IPlayer, b: IPlayer) => Number(a.matchRank) - Number(b.matchRank),
    )

    return players
  },
}
