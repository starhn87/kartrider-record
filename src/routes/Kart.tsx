import React from 'react'
import HelmetWrapper from '../components/common/Helmet'
import NoItem from '../components/common/NoPage'
import { PageWrapper } from './Home'

export default function Kart() {
  return (
    <PageWrapper>
      <HelmetWrapper content="카트 | TMI" />
      <NoItem />
    </PageWrapper>
  )
}
