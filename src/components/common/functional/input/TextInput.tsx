import styled from "styled-components"
import { SFlexCol } from "../../styled/SFlexContainer"

const SContainer = styled(SFlexCol)`
  align-items: baseline;
  position: relative;
  margin: 15px 0;
  box-sizing: border-box;
  width: 100%;
`

const STextInput = styled.input`
  width: 100%;
  height: 45px;
  border-radius: ${({ theme }) => theme.styles.container.borderRadius.small};
  background-color: ${({ theme }) => theme.styles.colors.grey_15};
  padding: 4px 7px;
  font-size: 1rem;
  color: ${({ theme }) => theme.styles.colors.grey_7};
  font-family: "Helvetica", sans-serif;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.styles.colors.grey_9};
  box-sizing: border-box;
  margin: 0;

  &.dark {
    background-color: ${({ theme }) => theme.styles.colors.grey_2_5};
    color: ${({ theme }) => theme.styles.colors.grey_8};
  }
`

const SLabel = styled.label`
  margin: 5px 0;
  font-size: ${({ theme }) => theme.styles.text.size.medium};
  font-weight: ${({ theme }) => theme.styles.text.weight.light};
  color: ${({ theme }) => theme.styles.colors.grey_7};

  &.sm {
    font-size: 0.7rem;
  }

  &.md {
    font-size: 0.9rem;
    font-weight: 300;
  }

  &.lg {
    font-size: 1.1rem;
  }
`

const SError = styled.p`
  font-size: 0.8rem;
  color: #d80000;
  font-style: italic;
  margin: 7px 0px;
  padding: 0;
`

const TextInput = ({
  inputValue,
  setInputValue,
  type,
  label,
  error, 
  inputStyles,
  labelStyles,
  containerStyles,
}: any) => {
  const handleInput = (e: any) => {
    setInputValue(e.target.value)
  }

  return (
    <SContainer className={containerStyles ? containerStyles : ""}>
      <SLabel className={labelStyles ? labelStyles : ""}>{label}</SLabel>
      
        <STextInput
          className={inputStyles ? inputStyles : ""}
          type={type}
          onChange={handleInput}
          value={inputValue}
        />

      {error && <SError>{error}</SError>}
    </SContainer>
  )
}

export default TextInput
