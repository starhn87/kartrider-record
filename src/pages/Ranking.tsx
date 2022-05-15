import React from 'react'
import HelmetWrapper from '../components/common/Helmet'
import NoItem from '../components/common/NoPage'
import { PageWrapper } from './Home'

export default function Ranking() {
  return (
    <PageWrapper>
      <HelmetWrapper content="랭킹 | TMI" />
      <NoItem />
    </PageWrapper>
  )
}
