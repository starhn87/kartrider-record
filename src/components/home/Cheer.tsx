import styled from '@emotion/styled'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { addComment, getComments } from '../../firebase'
import { useAppSelector } from '../../redux/store'
import { v4 as uuid } from 'uuid'
import { MdCircle } from 'react-icons/md'
import { differenceInMilliseconds, differenceInSeconds } from 'date-fns'

interface IComment {
  [key: string]: {
    comment: string
    timestamp: number
  }
}

export default function Cheer() {
  const username = useAppSelector((state) => state.user.nickname)
  const [nickname, setNickName] = useState('')
  const [comment, setComment] = useState('')
  const [isReady, setIsReady] = useState(false)
  const [nicknameList, setNickNameList] = useState<string[]>([])
  const [commentList, setCommentList] = useState<IComment>({})

  const onClick = () => {
    const tempName = `${nickname}-${uuid()}}`
    const newComment = {
      [tempName]: {
        comment,
        timestamp: Date.now(),
      },
    }

    addComment(username, newComment)

    setCommentList((prev) => ({
      ...newComment,
      ...prev,
    }))
    setComment('')

    if (!nicknameList.includes(nickname)) {
      setNickNameList((prev) => [tempName, ...prev])
    }
  }

  useEffect(() => {
    ;(async () => {
      const comments: IComment | null = await getComments(username)

      if (!comments) {
        return
      }

      const sortedComments = Object.entries(comments)
        .sort(([, a], [, b]) => {
          return b.timestamp - a.timestamp
        })
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})

      setCommentList(sortedComments)
    })()
  }, [])

  return (
    <>
      <Container>
        <List>
          {Object.keys(commentList).map((key, index) => (
            <Item
              key={key}
              className={`${
                nicknameList.length > 0 && index === 0 ? 'fresh' : ''
              }`}
            >
              <NickNameBox>
                <NickName>
                  {key.split('-')[0]}
                  {nicknameList.includes(key) && (
                    <CircleWrapper>
                      <MdCircle />
                    </CircleWrapper>
                  )}
                </NickName>
              </NickNameBox>
              <ChatBox>
                <p>{commentList[key].comment}</p>
              </ChatBox>
            </Item>
          ))}
        </List>
      </Container>
      <Writer>
        <MessageBox>
          <NameWriter
            type={'text'}
            placeholder="닉네임"
            maxLength={5}
            minLength={2}
            value={nickname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNickName(e.target.value)

              if (e.target.value.length > 1 && comment.length > 1) {
                setIsReady(true)
              } else {
                setIsReady(false)
              }
            }}
          />
          <Comment
            type={'text'}
            placeholder="최대 30자"
            maxLength={30}
            minLength={2}
            value={comment}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setComment(e.target.value)

              if (e.target.value.length > 1 && nickname.length > 1) {
                setIsReady(true)
              } else {
                setIsReady(false)
              }
            }}
          />
          <Button
            className={`${isReady ? 'active' : ''}`}
            disabled={!isReady}
            onClick={() => onClick()}
          >
            남기기
          </Button>
        </MessageBox>
      </Writer>
    </>
  )
}

const Container = styled.div`
  margin: 0 12px 0;
  height: 159px;
  overflow-y: auto;
  font-size: 12px;
`

const List = styled.ul`
  margin-left: 5px;
`

const Item = styled.li`
  display: flex;
  margin-right: 10px;
  align-items: center;

  &.fresh {
    animation: showing 2s ease;
  }

  @keyframes showing {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`

const NickNameBox = styled.div`
  display: inline-block;
`

const NickName = styled.p`
  color: var(--blue);
  line-height: 53px;
`

const ChatBox = styled.div`
  margin-left: 15px;
  flex: 2.5;
  display: inline-block;
  position: relative;
  padding: 10px;
  margin: 5px 5px 5px 15px;
  border: 1px solid #c3ced5;
  color: #333;
  background: #fff;
  border-radius: 15px;
  font-size: 12px;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    bottom: auto;
    left: -8px;
    border-style: solid;
    border-width: 8px 8px 8px 0;
    border-color: transparent #c3ced5;
    display: block;
    width: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    bottom: auto;
    left: -7px;
    border-style: solid;
    border-width: 8px 8px 8px 0;
    border-color: transparent #fff;
    display: block;
    width: 0;
  }
`

const Writer = styled.div`
  position: relative;
  margin: 8px;
  padding: 8px;
  border-top: 1px solid #f2f2f2;
  line-height: 30px;
`

const MessageBox = styled.div`
  display: flex;
  height: 30px;
`

const Comment = styled.input`
  flex: 2;
  margin-right: 5px;
  padding: 1px 2px;
  vertical-align: middle;
  width: 60%;
  border: none;
  border-bottom: 1px solid #ccc;
  font-family: Noto Sans KR;
  font-size: 12px;
`

const NameWriter = styled(Comment)`
  width: 15%;
  flex: 0.8;
`

const Button = styled.button`
  border: 1px solid #ccc;
  background-color: #ccc;
  color: #fff;
  border-radius: 5px;
  padding: 1px 6px;

  &.active {
    flex: 0.5;
    vertical-align: middle;
    width: 15%;
    border: 1px solid var(--blue);
    background-color: transparent;
    color: var(--blue);
    font-family: Noto Sans KR;
  }
`

const CircleWrapper = styled.span`
  color: #f62459;
  margin-left: 5px;
  font-size: 10px;
  vertical-align: middle;
`
