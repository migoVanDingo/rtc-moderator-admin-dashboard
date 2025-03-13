import React from "react"
import { useAuth } from "./useAuth"

export const useLoginForm = () => {
  const [email, setEmail] = React.useState<string>("")
  const [emailError, setEmailError] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [passwordError, setPasswordError] = React.useState<string>("")

  const { handleGoogleLogin } = useAuth()

  const loginFields = [
    {
      label: "Email",
      inputValue: email,
      type: "text",
      placeholder: "",
      id: "email",
      error: emailError,
      callback: setEmail,
    },
    {
      label: "Password",
      inputValue: password,
      type: "password",
      placeholder: "",
      id: "password",
      error: passwordError,
      callback: setPassword,
    },
  ]

  const validatePayload = () => {
    if (email === "") {
      setEmailError("Email is required")
    }
    if (password === "") {
      setPasswordError("Password is required")
    }

    return false
  }

  const submitForm = () => {
    
    if(validatePayload())
        window.alert("Form submitted")
  }

  const googleLogin = () => {
    handleGoogleLogin()
  }

    return { loginFields, submitForm, googleLogin }
}
