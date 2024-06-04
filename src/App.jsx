import { useContext, useState, useEffect } from "react"
import { AuthContext, ProfileContext, UserNameContext } from "./context"
import { fetchUser } from "./api"
import UploadImage from "./UploadImage"
import UploadMessage from "./UploadMessage"
import Messages from "./Messages"

function App() {
  const { auth } = useContext(AuthContext)
  const {profile, setProfile} = useContext(ProfileContext)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const {userName, setUserName} = useContext(UserNameContext)
  
  useEffect(() => {
    fetchUser({ auth })
    .then((response) => {
      setFirstName(response.data.first_name)
      setLastName(response.data.last_name)
      setProfile(response.data.id)
      setUserName(response.data.user)
    })
  }, [auth.accessToken])

  return (
    <div className=''>
      <div className="d-flex justify-content-start">
        <h1>{firstName} {lastName}</h1>
      </div>
      <UploadMessage />
      <Messages />
      
    </div>
  )
}


export default App
