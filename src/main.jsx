import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import App from './App'
import ErrorPage from './ErrorPage'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import { AuthContext, ProfileContext, UserNameContext } from './context'


function Layout() {
  return (
    <>
      <Header />
        <div id='page-content'>
          <Outlet />
        </div>
      <Footer />
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  }
])

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(undefined)
  
  const auth = {
    accessToken,
    setAccessToken,
  }

  return(
    <AuthContext.Provider value={{ auth: auth }} >
      {children}
    </AuthContext.Provider>
  )
}


const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(0)

  return(
    <ProfileContext.Provider value={{profile, setProfile}} >
      {children}
    </ProfileContext.Provider>
  )
}


const UserNameContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("")

  return(
    <UserNameContext.Provider value={{userName, setUserName}} >
      {children}
    </UserNameContext.Provider>
  )
}




ReactDOM.createRoot(document.getElementById('root')).render(
  <UserNameContextProvider>
    <ProfileContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ProfileContextProvider>
  </UserNameContextProvider>
)
