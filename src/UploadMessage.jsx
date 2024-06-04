import { createMessage } from "./api"
import { AuthContext, ProfileContext } from "./context"
import { useContext, useState } from "react"


const UploadImage = () => {
    const { auth } = useContext(AuthContext)
    const {profile, setProfile} = useContext(ProfileContext)
    const [message, setMessage] = useState(undefined)

    const submit = () => {
        createMessage({ 
            auth,
            message,
            profile,
        })
            .then(response => {
                console.log('UPLOAD MESSAGE: RESPONSE: ', response)
            })
            .catch(error => console.log('ERROR: ', error))
    }

    return (
        <div className='d-flex justify-content-start'>
            <div>                
                <div>
                    <input 
                        value = { message }
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={() => {submit()}}>
                        Send Message</button>
                </div>
            </div>
        </div>
    )
}


export default UploadImage