import styled from '@emotion/styled'
import React, { SyntheticEvent, useState } from 'react'
import KartRecord from './KartRecord'
import TrackRecord from './TrackRecord'

const TAB_ITEMS = [
  {
    key: 0,
    name: '트랙',
    selected: true,
  },
  {
    key: 1,
    name: '카트',
    selected: false,
  },
]

export default function Tab() {
  const [selected, setSelected] = useState(TAB_ITEMS[0].key)

  const onClick = (key: number) => {
    setSelected(key)
  }

  const onTrackError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      'https://s3-ap-northeast-1.amazonaws.com/solution-userstats/kartimg/Category/unknown_1.png'
  }

  const onKartError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://tmi.nexon.com/img/assets/empty_kart.png'
  }

  return (
    <>
      <div>
        <List>
          {TAB_ITEMS.map((item) => (
            <Item key={item.key} onClick={() => onClick(item.key)}>
              <Container className={`${selected === item.key ? 'active' : ''}`}>
                <Button>{item.name}</Button>
              </Container>
            </Item>
          ))}
        </List>
      </div>
      {selected === 0 && <TrackRecord onTrackError={onTrackError} />}
      {selected === 1 && (
        <KartRecord onTrackError={onTrackError} onKartError={onKartError} />
      )}
    </>
  )
}

const List = styled.ul`
  display: flex;
`

const Item = styled.li`
  cursor: pointer;
`

const Container = styled.div`
  width: 116px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  background-color: #ebebeb;
  font-size: 14px;
  border-bottom: 2px solid #ebebeb;

  &.active {
    background-color: #fff;
    border-bottom: 2px solid var(--blue);

    button {
      color: var(--blue);
    }
  }
`

const Button = styled.button`
  background-color: transparent;
  color: var(--gray);
`
