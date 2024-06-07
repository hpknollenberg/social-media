import { useContext, useState, useEffect } from "react"
import { AuthContext, UserNameContext, OtherProfileContext } from "./context"
import { fetchOtherUser, baseUrl } from "./api"
import UploadMessage from "./UploadMessage"
import ProfileMessages from "./ProfileMessages"

function App() {
  const { auth } = useContext(AuthContext)
  const {otherProfile, setOtherProfile} = useContext(OtherProfileContext)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [otherUserName, setOtherUserName] = useState("")
  const [profilePicture, setProfilePicture] = useState(undefined)

  
  useEffect(() => {
    fetchOtherUser({ auth, otherProfile })
    .then((response) => {
      setFirstName(response.data.first_name)
      setLastName(response.data.last_name)
      setOtherUserName(response.data.user)
      setProfilePicture(response.data.profile_picture)
      console.log(response)})
  }, [])

  const ProfilePicture = () => {
    if (profilePicture) {
      return (
      <div>
        <img src={`${baseUrl}{profilePicture}`} 
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
        <h4 style={{boxShadow: '10px 10px'}}>{otherUserName}</h4>
      </div> 
      <div>
        <p>Welcome to {firstName}'s Profile!</p>
      </div>
      <ProfileMessages />
    </div>
  )
}


export default App
