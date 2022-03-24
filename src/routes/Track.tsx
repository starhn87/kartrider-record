import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { matchApi } from '../api'
import Loading from '../components/Loading'

export default function Track() {
  const { data, isFetching } = useQuery(['all'], () => matchApi.all(), {
    // staleTime: 60 * 1000,
    retry: false,
  })

  if (isFetching) {
    return <Loading />
  }

  console.log(data)

  return <div>Track</div>
}
