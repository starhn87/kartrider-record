import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { addComment, getComments } from '../../firebase'
import { useAppSelector } from '../../redux/store'
import { v4 as uuid } from 'uuid'
import { MdCircle } from 'react-icons/md'
import { IComment } from '../../interface'

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

const Container = styled.section`
  height: 159px;
  margin: 0 12px 0;
  overflow-y: auto;
  font-size: 12px;
`

const List = styled.ul`
  margin-left: 5px;
`

const Item = styled.li`
  position: relative;
  display: flex;
  margin-right: 10px;
  right: 0;
  align-items: center;

  &.fresh {
    animation: showing 1s ease;
  }

  @keyframes showing {
    from {
      opacity: 0;
      right: -130px;
    }
    to {
      opacity: 1;
      right: 0;
    }
  }
`

const NickNameBox = styled.article`
  display: inline-block;
`

const NickName = styled.p`
  color: var(--blue);
  line-height: 53px;
`

const ChatBox = styled.article`
  position: relative;
  display: inline-block;
  margin: 5px 5px 5px 15px;
  padding: 10px;
  flex: 2.5;
  border: 1px solid #c3ced5;
  color: #333;
  background: #fff;
  border-radius: 15px;
  font-size: 12px;

  &::before {
    content: '';
    position: absolute;
    width: 0;
    top: 10px;
    bottom: auto;
    left: -8px;
    border-style: solid;
    border-width: 8px 8px 8px 0;
    border-color: transparent #c3ced5;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    top: 10px;
    bottom: auto;
    left: -7px;
    border-style: solid;
    border-width: 8px 8px 8px 0;
    border-color: transparent #fff;
    display: block;
  }
`

const Writer = styled.div`
  position: relative;
  margin: 8px;
  padding: 8px;
  border-top: 1px solid #f2f2f2;
  line-height: 30px;
`

const MessageBox = styled.section`
  display: flex;
  height: 30px;
`

const Comment = styled.input`
  width: 60%;
  margin-right: 5px;
  padding: 1px 2px;
  flex: 2;
  vertical-align: middle;
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
  padding: 1px 6px;
  border: 1px solid #ccc;
  background-color: #ccc;
  color: #fff;
  border-radius: 5px;

  &.active {
    width: 15%;
    flex: 0.5;
    vertical-align: middle;
    border: 1px solid var(--blue);
    background-color: transparent;
    color: var(--blue);
    font-family: Noto Sans KR;
  }
`

const CircleWrapper = styled.span`
  margin-left: 5px;
  color: #f62459;
  font-size: 10px;
  vertical-align: middle;
`
