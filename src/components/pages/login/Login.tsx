import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"
import Button from "../../common/functional/input/Button"
import Heading from "../../common/functional/text/Heading"
import {
    SFormContainer,
    SGenericPageContainer,
} from "../../common/styled/SContainer"
import { SFlexCol } from "../../common/styled/SFlexContainer"
import { useLoginForm } from "../../../hooks/useLoginForm"
import TextInput from "../../common/functional/input/TextInput"

const SLoginContainer = styled(SFlexCol)`
  width: 500px;

  border: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  border-radius: ${({ theme }) => theme.styles.container.borderRadius.medium};
  padding: ${({ theme }) => theme.styles.container.padding.xxlarge};
  background-color: ${({ theme }) => theme.styles.colors.grey_14};
  box-sizing: border-box;
`

const Login = () => {

    const { loginFields, submitForm, googleLogin } = useLoginForm()

  return (
    <SGenericPageContainer>
      <SLoginContainer>
        <Heading heading={"Login"} styles={"f-weight-200 f-lg"} />

        <SFormContainer>
          {loginFields.map((field: any) => {
            return <TextInput key={field.id} 
                              inputValue={field.inputValue}
                              setInputValue={field.callback}
                              type={field.type}
                              error={field.error}
                              label={field.label} />
          })}
          <Button buttonText={"Login"} handleClick={submitForm}/>
        </SFormContainer>
         <Heading heading={"Or"} styles={"f-weight-200 f-md p-2"} />
        <Button  buttonText={"Login with Google"} icon={faGoogle} handleClick={googleLogin} />
      </SLoginContainer>
    </SGenericPageContainer>
  )
}

export default Login
