import axios from 'axios'
import { IPlayer, ITrackDetail } from './interface'
import { MATCH_TYPE } from './redux/slice'
import TrackInfo from './assets/track.json'

const api = axios.create({
  baseURL: '/api',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTU3Nzc5MzM1OSIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTM5MyIsIlgtQXBwLVJhdGUtTGltaXQiOiI1MDA6MTAiLCJuYmYiOjE2NDc3NjgwMzIsImV4cCI6MTY2MzMyMDAzMiwiaWF0IjoxNjQ3NzY4MDMyfQ.2k2Ww1aqGG0wKnPID7xTrz2igMCUywLtapw9zM6pRRQ',
  },
})

export const searchApi = {
  username: async (nickname: string, gameType: keyof typeof MATCH_TYPE) => {
    if (nickname.trim() === '') {
      return null
    }

    const userInfo = await (await api.get(`/users/nickname/${nickname}`)).data
    const { data } = await api.get(`/users/${userInfo.accessId}/matches`, {
      params: {
        offset: 0,
        limit: 200,
        match_types: gameType,
      },
    })

    return {
      userInfo,
      data,
    }
  },
}

export const matchApi = {
  all: async () => {
    const {
      data: { matches },
    } = await api.get('/matches/all', {
      params: {
        offset: 0,
        limit: 200,
        match_types: Object.keys(MATCH_TYPE)[0],
      },
    })

    let totalCount = 0
    const trackMap = new Map<string, ITrackDetail>()

    await Promise.all(
      matches[0].matches.map(async (matchId: string) => {
        const { data } = await api.get(`/matches/${matchId}`)
        const players = data.players
        let info: ITrackDetail | undefined

        totalCount += players.length

        if (trackMap.has(data.trackId)) {
          info = trackMap.get(data.trackId)
        } else {
          info = {
            name: TrackInfo.find((track) => track.id === data.trackId)!.name,
            count: 0,
            retireCount: 0,
            bestRecord: Number.MAX_SAFE_INTEGER,
            bestRider: '',
            kartId: '',
          }
        }

        info!.count += players.length

        players.forEach((player: IPlayer) => {
          if (player.matchRetired === '1') {
            info!.retireCount += 1
          }

          const playTime = Number(player.matchTime)

          if (playTime > 0 && info!.bestRecord > playTime) {
            info!.bestRecord = playTime
            info!.bestRider = player.characterName
            info!.kartId = player.kart
          }
        })

        trackMap.set(data.trackId, info!)
      }),
    )

    return {
      tracks: Array.from(trackMap.values()),
      totalCount,
    }
  },

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
