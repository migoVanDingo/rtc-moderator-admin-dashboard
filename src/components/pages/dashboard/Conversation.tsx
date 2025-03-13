import "firebase/firestore"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { getAllUsers } from "../../../firebase/collections/user"
import { subscribeToMessages } from "../../../firebase/subscribe/messages"
import { SFlexCol } from "../../common/styled/SFlexContainer"

const SContainer = styled(SFlexCol)`
  grid-area: message-container;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  padding: ${({ theme }) => theme.styles.container.padding.medium};
  background-color: ${({ theme }) => theme.styles.colors.grey_14};
  height: 100%;
  overflow-y: scroll;
`

const SMessageContainer = styled(SFlexCol)`
  max-width: 400px;

  border-radius: ${({ theme }) => theme.styles.container.borderRadius};
  margin: 15px 0;
  box-sizing: border-box;
  &.push-right {
    margin-left: auto;
  }

  &.push-left {
    margin-right: auto;
  }
`

const SMessage = styled.p`
  width: 100%;
  font-size: ${({ theme }) => theme.styles.text.size.medium};
  border-radius: ${({ theme }) => theme.styles.container.borderRadius.small};
  background-color: ${({ theme }) => theme.styles.colors.green_3};
  color: ${({ theme }) => theme.styles.colors.grey_15};
  margin: 0;

  &.me {
    background-color: ${({ theme }) => theme.styles.colors.blue_2};
  }

  &.user {
    font-size: ${({ theme }) => theme.styles.text.size.small};
    color: ${({ theme }) => theme.styles.colors.grey_1};
    background-color: transparent;
  }

  &.message {
    padding: ${({ theme }) => theme.styles.container.padding.medium};
  }
`
const SInv = styled.button`
  display: none;
`

const Conversation = () => {
  const user = sessionStorage.getItem("user")
  const userId = user ? JSON.parse(user).uid : ""
  const chatroomId = sessionStorage.getItem("chatroomId")
  const [currentUser, setCurrentUser] = React.useState(userId)
  const [messages, setMessages] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])

  const containerRef = useRef(null) as any;



  useEffect(() => {
    console.log("chatroomId", chatroomId)
    if (!chatroomId) return

    const unsubscribe = subscribeToMessages(chatroomId, (newMessages) => {
      setMessages(newMessages)
    })

    return () => {
      unsubscribe() // Cleanup when component unmounts
    }
  }, [chatroomId])

  useEffect(() => {
    const init = () => {
      messages && messages.length > 0 && getUsers()

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight; // Scroll to bottom
      }
    }

    return init()
  }, [messages])

  const getUsers = async () => {
    const allUsers = await getAllUsers()

    const userIdSet = new Set(messages.map((message) => message.senderId))
    const users = allUsers.filter((user) => userIdSet.has(user.id))

    console.log("users", users)

    setUsers(users)
  }
    // const timestamp = new firebase.firestore.Timestamp(timestamp) // Firebase timestamp example
  const formatTimestamp = (timestamp: any) => {
 
     if (timestamp && timestamp.toDate) {
    const date = timestamp.toDate(); // Converts Firebase timestamp to JavaScript Date
    return date.toLocaleString(); // Format as local string
  }
  return "";
  }

  return (
    <SContainer ref={containerRef}>
      <SInv onClick={setCurrentUser}/>
      {messages.map((message: any) => {
        return (
          <SMessageContainer
            key={message.id}
            className={`${
              currentUser == message.senderId ? "push-right" : "push-left"
            }`}
          >
            <SMessage className={"user"}>
              {users.find((user) => message.senderId === user.id)?.username}
            </SMessage>
            <SMessage
              className={`${
                currentUser == message.senderId ? "me" : ""
              } ${"message"}`}
            >
              {message.content}
            </SMessage>
            <SMessage className={"user"}>{formatTimestamp(message.timestamp)}</SMessage>
          </SMessageContainer>
        )
      })}
    </SContainer>
  )
}

export default Conversation
