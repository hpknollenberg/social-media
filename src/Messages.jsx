import { useState, useEffect, useContext } from "react"
import { AuthContext, ProfileContext, UserNameContext } from './context'
import { getMessages, deleteMessage, updateLikes } from "./api"


const Images = () => {
    const { auth } = useContext(AuthContext)
    const [messages, setMessages] = useState([])
    const {userName, setUserName} = useContext(UserNameContext)


    useEffect(() => {
        const getMessagesNow = () => {
            if (auth.accessToken) {
                getMessages({auth})
                    .then((response) => {
                        setMessages(response.data)
                    })
                    .catch(error => console.log('ERROR: ', error))
            }
        }

        const intervalFunc = setInterval(() => {
            getMessagesNow()
        }, 10000)
        
        getMessagesNow()
        return () => clearInterval(intervalFunc)
        
    }, [auth.accessToken])


    const deleteButtonFunc = (id) => {
        console.log(id)
        deleteMessage({ auth, id })
        .then ((response) => {
            console.log("DELETE: ", response)
        })
    }

    const DeleteButton = ({author, id}) => {
        if (author === userName) {
            return (
                <div>
                    <button
                    onClick={() => {deleteButtonFunc(id)}}>Delete Message</button>
                </div>
            )
        }
    }

    const ImageQuestion = ({image}) => {
        if (image) {
            return (
                <div style={{ maxHeight: ''}}>
                    <img src={`https://social-media-back-end.fly.dev/images/${image}`} 
                        style={{ maxHeight: '15rem', maxWidth: '15rem' }} />
                </div>
            )
        }
    }


    const LikesButton = ({id}) => {
        return (
            <div>
                <button onClick={() => {updateLikes({ auth, id })}}>Like</button>
            </div>
        )
    }

    
    return (
        <div style={{ marginTop: 20, textAlign: 'right' }}>
            <hr></hr>
            <h1>Messages</h1>
            <hr></hr>
            <div className="d-flex justify-content-end">
                <div>
                    {messages && messages.map(message => (
                        <div key={message.id} style={{ borderStyle: 'solid ', margin: '5px', padding: '5px'}}>
                            <h4>{message.author}</h4>
                            <ImageQuestion image={message.image} />
                            <p>{message.content}</p>
                            <p>Total Likes: {message.likes_count}</p>
                            <LikesButton id={message.id}/>
                            <p>{message.created_at}</p>
                            <DeleteButton author={message.author} id={message.id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Images