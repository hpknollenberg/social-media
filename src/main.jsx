import React, { useState, useEffect } from 'react'
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
import Account from './Account'
import Profiles from './Profiles'
import { AuthContext, ProfileContext, UserNameContext, OtherProfileContext } from './context'


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
      {
        path: '/account',
        element: <Account />
      },
      {
        path: 'profiles',
        element: <Profiles />
      }
    ]
  }
])


const AuthContextProvider = ({ children }) => {
  let tempToken = JSON.parse(localStorage.getItem('token'))
  
  const [accessToken, setAccessToken] = useState(tempToken ? tempToken : [])

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(accessToken))
  }, [accessToken])

  
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


const OtherProfileContextProvider = ({ children }) => {
  let tempOtherProfile = JSON.parse(localStorage.getItem('other-profile'))
  
  const [otherProfile, setOtherProfile] = useState(tempOtherProfile ? tempOtherProfile : 0)

  useEffect(() => {
    localStorage.setItem("other-profile", JSON.stringify(otherProfile))
  }, [otherProfile])
  



  return (
    <OtherProfileContext.Provider value={{otherProfile, setOtherProfile}}>
      {children}
    </OtherProfileContext.Provider>
  )
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <UserNameContextProvider>
      <ProfileContextProvider>
        <OtherProfileContextProvider>
          <RouterProvider router={router} />
        </OtherProfileContextProvider>
      </ProfileContextProvider>
    </UserNameContextProvider>
  </AuthContextProvider>
)
