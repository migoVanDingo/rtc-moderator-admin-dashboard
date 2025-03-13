import styled from "styled-components"
import { useChatInput } from "../../../hooks/useChatInput"
import Button from "../../common/functional/input/Button"
import { SFlexCol, SFlexRow } from "../../common/styled/SFlexContainer"

const SContainer = styled.div`
  grid-area: message-input;
  width: 100%;
  height: 100%;

  padding: ${({ theme }) => theme.styles.container.padding.xlarge};
  background-color: ${({ theme }) => theme.styles.colors.grey_14};
  box-shadow: 0 -2px 3px ${({ theme }) => theme.styles.colors.grey_11};
`

const SColContainer = styled(SFlexCol)`
  width: 100%;
  gap: 20px;
`

const SRowContainer = styled(SFlexRow)`
  width: 100%;
  gap: 20px;

  &.w-auto {
    width: auto;
  }

  &.push-right {
    margin-left: auto;
  }
`

const STextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;

  border: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  border-radius: ${({ theme }) => theme.styles.container.borderRadius};
  padding: ${({ theme }) => theme.styles.container.padding.small};
  font-size: ${({ theme }) => theme.styles.text.size.medium};
  font-family: ${({ theme }) => theme.styles.text.font};
  border-radius: ${({ theme }) => theme.styles.container.borderRadius.small};
  background-color: ${({ theme }) => theme.styles.colors.grey_15};
`

const ChatInput = () => {

  const { send, message, setMessage } = useChatInput()

  return (
    <SContainer>
      <SColContainer>
        <STextArea
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SRowContainer className={"w-auto push-right"}>
          <Button
            buttonText={"Clear"}
            styles={"w-lg push-right"}
            handleClick={() => setMessage("")}
          />
          <Button
            buttonText={"Send"}
            styles={"w-lg confirm f-weight-400"}
            handleClick={send}
          />
        </SRowContainer>
      </SColContainer>
    </SContainer>
  )
}

export default ChatInput
