import axios from 'axios'
import {
  IInfo,
  IKartInfo,
  IMatch,
  IPlayer,
  IRecord,
  ITrackDetail,
  ITrackInfo,
  ITrackRecord,
} from './interface'
import { MATCH_TYPE } from './redux/slice'
import TrackInfo from './assets/track.json'
import KartInfo from './assets/kart.json'
import { formatTime, subDate } from './util'

interface ITeam {
  players: IPlayer[]
  teamId: string
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: process.env.REACT_APP_API_KEY!,
  },
})

export const searchApi = {
  username: async (nickname: string, gameType: keyof typeof MATCH_TYPE) => {
    if (nickname.trim() === '') {
      return null
    }

    const ranks: number[] = []
    const record: IRecord[] = []
    const kartInfo = new Map<string, IKartInfo>()
    const trackInfo = new Map<string, ITrackInfo>()
    const userInfo = await (await api.get(`/users/nickname/${nickname}`)).data
    const {
      data: { matches },
    } = await api.get(`/users/${userInfo.accessId}/matches`, {
      params: {
        offset: 0,
        limit: 200,
        match_types: gameType,
      },
    })

    let retireCnt = 0
    let winCnt = 0
    let rankSum = 0

    matches[0].matches.forEach((match: IMatch) => {
      let rank = Number(match.player.matchRank)
      rank = rank >= 8 ? 8 : rank < 1 ? 1 : rank
      ranks.unshift(rank)
      rankSum += rank

      const kart = (
        KartInfo.find((info) => info.id === match.player.kart) as IInfo
      ).name

      const track = (
        TrackInfo.find((info) => info.id === match.trackId) as IInfo
      ).name as string

      if (match.player.matchRetired === '1') {
        retireCnt += 1
      }

      if (match.player.matchWin === '1') {
        winCnt += 1
      }

      record.push({
        matchId: match.matchId,
        track,
        rank,
        playerCount: match.playerCount,
        kart,
        playTime:
          match.player.matchRetired === '1'
            ? '-'
            : formatTime(Number(match.player.matchTime)),
        timeDiff: subDate(match.endTime),
        retired: match.player.matchRetired === '1',
      })

      let kInfo: IKartInfo

      if (kartInfo.has(kart)) {
        kInfo = kartInfo.get(kart) as IKartInfo
      } else {
        kInfo = {
          map: [],
          id: '',
          name: kart,
          count: 0,
          winCount: 0,
          retireCount: 0,
        }
      }

      kInfo.id = match.player.kart
      kInfo.count += 1

      if (match.player.matchRetired === '1') {
        kInfo.retireCount += 1
      }

      if (match.player.matchWin === '1') {
        kInfo.winCount += 1
      }

      const playTime = Number(match.player.matchTime)

      if (playTime > 0) {
        kInfo.map.push({
          name: track,
          record: playTime,
          id: match.trackId,
        })
      }

      kartInfo.set(kart, kInfo)

      let info: ITrackInfo

      if (trackInfo.has(track)) {
        info = trackInfo.get(track) as ITrackInfo
      } else {
        info = {
          id: '',
          name: track,
          count: 0,
          winCount: 0,
          min: Number.MAX_SAFE_INTEGER,
          matchIds: [],
        }
      }

      info.id = match.trackId
      info.count += 1
      info.matchIds.push(match.matchId)

      if (match.player.matchWin === '1') {
        info.winCount += 1
      }

      const matchTime = Number(match.player.matchTime)

      if (matchTime !== 0 && info.min > matchTime) {
        info.min = matchTime
      }

      trackInfo.set(track, info)
    })

    kartInfo.forEach((value) => {
      value.map.sort((a: ITrackRecord, b: ITrackRecord) => a.record - b.record)

      if (value.map.length > 4) {
        value.map.splice(4, value.map.length)
      }
    })

    const finalKartInfo = Array.from(kartInfo.values()).sort(
      (a, b) => b.count - a.count,
    )

    const finalTrackInfo = Array.from(trackInfo.values()).sort(
      (a, b) => b.count - a.count,
    )

    const winRate = Math.round((winCnt / matches[0].matches.length) * 100)
    const noRetiredRate =
      100 - Math.round((retireCnt / matches[0].matches.length) * 100)

    const winRateData = {
      title: '승률',
      data: [winRate, 100 - winRate],
      backgroundColor: 'rgba(1,119,255, 1)',
      text: `${winRate}%`,
      textColor: 'rgba(1,119,255, 1)',
    }

    const noRetiredData = {
      title: '완주율',
      data: [noRetiredRate, 100 - noRetiredRate],
      backgroundColor: 'rgba(155,214,40, 1)',
      text: `${noRetiredRate}%`,
      textColor: 'rgba(155,214,40, 1)',
    }

    const retiredData = {
      title: '리타이어율',
      data: [100 - noRetiredRate, noRetiredRate],
      backgroundColor: 'rgba(246,36,88, 1)',
      text: `${100 - noRetiredRate}%`,
      textColor: 'rgba(246,36,88, 1)',
    }

    let recentRankSum = 0
    const ranksPart = ranks
      .slice(ranks.length >= 50 ? ranks.length - 50 : 0, ranks.length)
      .map((rank) => {
        recentRankSum += rank

        return rank
      })

    const totalAvgRank = rankSum / ranks.length
    const recentAvgRank = recentRankSum / ranksPart.length

    return {
      userId: userInfo.accessId,
      finalKartInfo,
      finalTrackInfo,
      record,
      character: matches[0].matches[0].character,
      winRateData,
      noRetiredData,
      retiredData,
      ranksPart,
      winCnt,
      totalAvgRank: totalAvgRank.toFixed(2),
      recentAvgRank: recentAvgRank.toFixed(2),
    }
  },
}

export const matchApi = {
  all: async (matchType: keyof typeof MATCH_TYPE) => {
    const {
      data: { matches: matches1 },
    } = await api.get('/matches/all', {
      params: {
        offset: 0,
        limit: 200,
        match_types: matchType,
      },
    })

    const {
      data: { matches: matches2 },
    } = await api.get('/matches/all', {
      params: {
        offset: 200,
        limit: 200,
        match_types: matchType,
      },
    })

    let totalCount = 0
    const trackMap = new Map<string, ITrackDetail>()

    await Promise.all(
      [...matches1[0].matches, ...matches2[0].matches]
        // .slice(0, 10)
        .map(async (matchId: string) => {
          const { data } = await api.get(`/matches/${matchId}`, {
            params: {
              match_types: matchType,
            },
          })

          const players = data.players
            ? data.players
            : data.teams.reduce((prev: IPlayer[], { players }: ITeam) => {
                if (players && players.length > 0) {
                  return [...prev, ...players]
                } else {
                  return prev
                }
              }, [])

          // const players = data.players
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
