import styled from "styled-components"
import { SFlexCol } from "../../common/styled/SFlexContainer"
import ModuleHeader from "../../complex/ModuleHeader"



const SChatList = styled(SFlexCol)`
  width: 100%;
  padding: ${({ theme }) => theme.styles.container.padding.small};
  gap: 10px;

  `

const SChatContainer = styled(SFlexCol)`
  border: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  padding: ${({ theme }) => theme.styles.container.padding.small};
  border-radius: ${({ theme }) => theme.styles.container.borderRadius.small};
  width: 100%;
  gap: 3px;
  align-items: flex-start;
  overflow: hidden;
  background-color: ${({ theme }) => theme.styles.colors.grey_15};
  cursor: pointer;
  transform: translateY(0); /* Default position */
  transition: all 0.2s ease;

  &:hover {
    border: 2px solid ${({ theme }) => theme.styles.colors.blue_1};
    color: ${({ theme }) => theme.styles.colors.blue_1};
    background-color: ${({ theme }) => theme.styles.colors.grey_15};
    transform: translateY(-3px); 

  }

  &.selected {
    background-color: ${({ theme }) => theme.styles.colors.blue_1};
    color: ${({ theme }) => theme.styles.colors.grey_15};
  }
`

const SLabel = styled.p`
  

  padding:0;
  margin: 0;

  &.name{

  }
  &.date{
    font-size: ${({ theme }) => theme.styles.text.size.small};
    font-weight: ${({ theme }) => theme.styles.text.weight.light};
    font-style: italic;
  }
  
  `


const SContainer = styled(SFlexCol)`
  grid-area: chat-list;
  border-right: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  height: calc(100vh - 60px);
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.styles.colors.grey_14};

  @media (max-width: 768px) {
    position: absolute;
    left: -100%;
    transition: all 0.2s ease;

    &.show {
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.styles.colors.grey_14};
      border-right: none;
      border-bottom: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
      overflow-y: scroll;
    }

  }
`

// Chat list component
const ChatList = ({ chatList, currentChatroom, handleSelectChat, mobileView }: any) => {
  return (
    <SContainer className={mobileView === "chat-list" ? "show" : ""}>
      <ModuleHeader
        heading={"Conversations"}
        headingStyles={"f-weight-200 f-md p-1"}
        
      />
      <SChatList>
        {chatList.map((chat: any, index: number) => (
          <SChatContainer
            className={currentChatroom === chat.id ? "selected" : ""}
            key={index}
            onClick={() => handleSelectChat(chat.id)}
          >
            <SLabel>{chat.name}</SLabel>
            <SLabel className={"date"}>{"Last Update: " + chat.createdAt}</SLabel>
          </SChatContainer>
        ))}
      </SChatList>
    </SContainer>
  )
}

export default ChatList

