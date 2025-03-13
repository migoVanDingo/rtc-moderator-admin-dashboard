import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import { useOutletContext } from 'react-router-dom'
import styled from 'styled-components'
import { useChatList } from '../../../hooks/useChatList'
import Button from '../../common/functional/input/Button'
import TextInput from '../../common/functional/input/TextInput'
import { SFlexCol } from '../../common/styled/SFlexContainer'
import ChatList from './ChatList'
import MainChat from './MainChat'
import UserList from './UserList'


export const SModalContainer = styled(Modal)`
  .mantine-Modal-root {
    border-radius: ${({ theme }) => theme.styles.container.borderRadius.large};
    overflow: hidden;
  }
  .mantine-Modal-body {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.styles.colors.grey_14};
    border: 2px solid ${({ theme }) => theme.styles.colors.grey_11};
    border-top: none;
    color: ${({ theme }) => theme.styles.colors.grey_7};
  }

  .mantine-Modal-header {
    background-color: ${({ theme }) => theme.styles.colors.grey_14};
    padding: 16px;
    border: 2px solid ${({ theme }) => theme.styles.colors.grey_11};
    border-bottom: none;
    color: ${({ theme }) => theme.styles.colors.grey_7};
    
  }
`

export const SModalMod = styled(SFlexCol)`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.styles.colors.grey_14};
`

const SEmptyChat = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.styles.container.padding.large};
  gap: 20px;
`







// Styled component for grid layout
const SPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "chat-list main user-list";

  // Hide chat and user lists on small screens
  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Collapse to a single column layout
    grid-template-areas: "main";
  }
`

const SInv = styled.button`
  display: none;
`

// Dashboard component with burger menu integration
const Dashboard = () => {
  const [opened, { open }] = useDisclosure(false)
  const { username, userId, mobileView } =
    useOutletContext() as {
      username: string
      userId: string
      mobileView: string
    }
  const { chatList, currentChatroom, handleSelectChat } = useChatList()
  const [showChatList, setShowChatList] = React.useState(true)
  const [showUserList, setShowUserList] = React.useState(true)



  return (
    <SPage>
      <SInv onClick={() => setShowChatList(prev => !prev)}  />
      <SInv onClick={() => setShowUserList(prev => !prev)}  />
      {/* Toggle visibility of the chat list based on the state */}
      {showChatList && (
        <ChatList mobileView={mobileView} handleClick={open} chatList={chatList} currentChatroom={currentChatroom} handleSelectChat={handleSelectChat} />
      )}

      {/* Main chat window */}
      {userId !== '' && currentChatroom !== '' ? (
        <MainChat  mobileView={mobileView} />
      ) : (
        <SEmptyChat>Select a Chatroom to start messaging.</SEmptyChat>
      )}

      {/* Toggle visibility of the user list based on the state */}
      {showUserList && <UserList  mobileView={mobileView} username={username} currentChatroom={currentChatroom} />}


    </SPage>
  )
}

export default Dashboard
