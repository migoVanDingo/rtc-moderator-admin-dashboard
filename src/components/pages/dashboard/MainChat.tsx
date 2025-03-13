import styled from 'styled-components'
import ChatInput from './ChatInput'
import Conversation from './Conversation'

const SContainer = styled.div`
  grid-area: main;
  height: calc(100vh - 60px);
  display: grid;
  grid-template-rows: 5fr 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "message-container" "message-input";



`







const MainChat = ({ mobileView }: any) => {
  return (
    <SContainer className={mobileView === "main" ? "show" : "hide"}>
        <Conversation />
        <ChatInput />
    </SContainer>
  )
}

export default MainChat