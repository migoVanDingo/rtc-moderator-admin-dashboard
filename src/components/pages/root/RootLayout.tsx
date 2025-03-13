import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLoaderData } from 'react-router-dom'
import { setCurrentChatroom } from '../../../store/slices/chatroom'
import { setUserId, setUsername, setUserEmail } from '../../../store/slices/user'
import Header from '../../complex/Header'

const RootLayout = () => {

    const { uid, username, currentChatroom, email} = useLoaderData() as { uid: string, username: string, currentChatroom: string, email: string }
    const dispatch = useDispatch()

    const [mobileView, setMobileView] = React.useState<string>("main")
    useEffect(() => {
      const init = () => {
        uid !== "" && dispatch(setUserId(uid))
        username !== "" && dispatch(setUsername(username))
        currentChatroom !== "" && dispatch(setCurrentChatroom(currentChatroom))
        email !== "" && dispatch(setUserEmail(email))

      }
      return init()
    }, [uid])

    return (
      <>
          <Header username={username} setMobileView={setMobileView}/>
          <Outlet context={{userId: uid, username: username, mobileView}} />
      </>
    )
  }
  
  export default RootLayout

  export const loader = () => {
    const uid = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string).uid : ""
    const username = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string).displayName : ""

     const email = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).email : ""

    const currentChatroom = sessionStorage.getItem("chatroomId") || ""


    return {
      uid,
      username,
      email,
      currentChatroom
    }

  }