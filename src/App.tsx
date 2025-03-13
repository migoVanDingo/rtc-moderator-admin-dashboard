import { createTheme, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import RootLayout from "./components/pages/root/RootLayout"
import ProtectedRoute from "./route/ProtectedRoute"
import { themeObject } from "./theme/themeLight"

import ChatList from "./components/pages/dashboard/ChatList"
import Dashboard from "./components/pages/dashboard/Dashboard"
import ErrorPage from "./components/pages/error/ErrorPage"
import Login from "./components/pages/login/Login"
import Logout from "./components/pages/logout/Logout"
import Signup from "./components/pages/signup/Signup"
import { loader } from "./utility/Loader"

const mantineTheme = createTheme({})

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        loader: loader.RootLoader,
        action: () => {},
        id: "root",
        children: [
          {
            path: "/",
            element: <Dashboard />,
            index:true,
            loader: () => {},
            action: () => {},
            id: "landing",
          },
          {
            path: "/error",
            element: <ErrorPage />,
            loader: () => {},
            action: () => {},
            id: "error",
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
            loader: () => {},
            action: () => {},
            id: "dashboard",
            children: [
              {
                path: "list",
                element: <ChatList/>,
                loader: () => {},
                action: () => {},
                id: "chat-list",
              },
           
            ],
          },
          
        ],
      },
    ],
  },

  {
    path: "/signup",
    element: <Signup/>,
    loader: () => {},
    action: () => {},
    id: "signup",
  },
  {
    path: "/login",
    element: <Login/>,
    loader: () => {},
    action: () => {},
    id: "login",
  },
  {
    path: "/logout",
    element: <Logout/>,
    loader: () => {},
    action: () => {},
    id: "logout",
  },
])

const SInv = styled.button`
  display: none;
`

function App() {
  const [theme, setTheme] = useState<object>({
    theme: themeObject.themeType.dark,
    styles: themeObject,
  })

  

  return (
    <MantineProvider theme={mantineTheme}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <SInv onClick={setTheme}></SInv>
      </ThemeProvider>
    </MantineProvider>
  )
}

export default App
