import { useContext, useState, useEffect } from "react"
import { AuthContext, ProfileContext, UserNameContext } from "./context"
import { fetchUser, baseUrl } from "./api"
import UploadMessage from "./UploadMessage"
import Messages from "./Messages"
import { useNavigate } from "react-router-dom"


function App() {
  const { auth } = useContext(AuthContext)
  const {profile, setProfile} = useContext(ProfileContext)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const {userName, setUserName} = useContext(UserNameContext)
  const [profilePicture, setProfilePicture] = useState(undefined)
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchUser({ auth })
    .then((response) => {
      setFirstName(response.data.first_name)
      setLastName(response.data.last_name)
      setProfile(response.data.id)
      setUserName(response.data.user)
      setProfilePicture(response.data.profile_picture)
    })
    .catch(() => {
      navigate("/login")
    })
  }, [auth.accessToken])

  const ProfilePicture = () => {
    if (profilePicture) {
      return (
      <div>
        <img src={`${baseUrl}${profilePicture}`} 
            style={{ maxHeight: '7rem', maxWidth: '7rem' }} />
      </div>
      )
    }
  }

  return (
    <div className='' >
      <div className="d-flex justify-content-start">
        <ProfilePicture />
        <h1>{firstName} {lastName}</h1>
        <h4 style={{boxShadow: '10px 10px'}}>{userName}</h4>
      </div>
      <UploadMessage />
      <Messages />
      
    </div>
  )
}


export default App
