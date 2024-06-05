import { AuthContext, ProfileContext } from "./context"
import { editProfilePicture } from './api'
import { useContext, useState } from "react"


const EditAccount = () => {
    const { auth } = useContext(AuthContext)
    const [image, setImage] = useState("")

  const submit = () => {
    editProfilePicture({ auth, image })
  }

  return (
    <div>
      <div>
        <div>Change Profile Picture:</div>
      </div>
      <div>
        <input style={{backgroundColor: 'yellow'}}
                            accept='image/*'
                            type='file'
                            onChange={e => setImage(e.target.files[0])}
                        />
      </div>
      <div style={{ marginTop: 20 }}>
        <button onClick={() => submit()}>Submit</button>
      </div>
    </div>
  )
}

export default EditAccount