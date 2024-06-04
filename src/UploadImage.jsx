import { createImage } from "./api"
import { AuthContext } from "./context"
import { useContext, useState } from "react"


const UploadImage = () => {
    const { auth } = useContext(AuthContext)
    const [image, setImage] = useState(undefined)
    const [title, setTitle] = useState('')

    const submit = () => {
        createImage({ 
            auth,
            title,
            image,
        })
            .then(response => {
                console.log('UPLOAD IMAGE: RESPONSE: ', response)
            })
            .catch(error => console.log('ERROR: ', error))
    }

    return (
        <div className='d-flex justify-content-start'>
            <div>
                <h2 className="d-flex justify-content-start">Upload Image</h2>
                <div className="d-flex">
                    <div>Image Title:</div>
                    <input 
                        value = { title }
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        accept='image/*'
                        type='file'
                        onChange={e => setImage(e.target.files[0])}
                    />
                </div>
                <div>
                    <button onClick={() => {submit()}}>
                        Submit</button>
                </div>
            </div>
        </div>
    )
}


export default UploadImage