import { createMessage } from "./api"
import { AuthContext, ProfileContext } from "./context"
import { useContext, useState } from "react"


const UploadImage = () => {
    const { auth } = useContext(AuthContext)
    const {profile, setProfile} = useContext(ProfileContext)
    const [message, setMessage] = useState("")
    const [image, setImage] = useState("")

    const submit = () => {
        createMessage({ 
            auth,
            message,
            image,
            profile,
        })
            .then((response) => {
                console.log("MESSAGE: ", response)
            })
            .catch(error => console.log('ERROR: ', error))
        
        setMessage("")
        setImage("")
    }

    return (
        <div className='d-flex justify-content-start'>
            <div>                
                <div style={{ margin: "5px" }}>
                    <input 
                        value = { message }
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
                <div style={{ margin: "5px" }}>
                    <input
                        accept='image/*'
                        type='file'
                        onChange={e => setImage(e.target.files[0])}
                    />
                </div>
                <div style={{ margin: "5px" }}>
                    <button onClick={() => {submit()}}>
                        Send Message</button>
                </div>
            </div>
        </div>
    )
}


export default UploadImage