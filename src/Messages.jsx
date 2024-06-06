import { useState, useEffect, useContext } from "react"
import { AuthContext, ProfileContext, UserNameContext, OtherProfileContext } from './context'
import { getMessages, deleteMessage, updateLikes, baseUrl } from "./api"
import { Link } from "react-router-dom"
import Comment from "./Comment"


const Images = () => {
    const { auth } = useContext(AuthContext)
    const [messages, setMessages] = useState([])
    const {userName, setUserName} = useContext(UserNameContext)
    const {otherProfile, setOtherProfile} = useContext(OtherProfileContext)


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
        }, 1000)
        
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
                    <button style={{ backgroundColor: 'red' }}
                    onClick={() => {deleteButtonFunc(id)}}>Delete Message</button>
                </div>
            )
        }
    }

    const ImageQuestion = ({image}) => {
        if (image) {
            return (
                <div style={{ maxHeight: ''}}>
                    <img src={`${baseUrl}${image}`} 
                        style={{ maxHeight: '15rem', maxWidth: '15rem' }} />
                </div>
            )
        }
    }


    const LikesButton = ({id}) => {
        return (
            <div>
                <button style={{ backgroundColor: 'blue', color: 'white', borderRadius: '10px' }} onClick={() => {updateLikes({ auth, id })}}>Like</button>
            </div>
        )
    }

    
    const ProfileInfoDisplay = ({user, picture, id}) => {
        if (picture) {
            return (
                <div>
                    <h4> <img style={{ maxHeight: '3rem', maxWidth: '3rem', borderRadius: '10px' }} src={`${baseUrl}${picture}`} /> <Link to="/profiles" onClick={(() => {setOtherProfile(id)})}>{user}</Link> </h4>
                </div>
            )
        } else {
            return (
                <div>
                    <h4> <Link to="/profiles" onClick={(() => {setOtherProfile(id)})}>{user}</Link> </h4>
                </div>
            )
        }
    }


    return (
        <div style={{ marginTop: 20, textAlign: 'right' }}>
            <hr></hr>
            <h1 style={{ backgroundColor: "pink", textShadow: "10px 10px black", color: "white"}}>⬇️Messages⬇️</h1>
            <hr></hr>
            <div className="d-flex justify-content-end">
                <div>
                    {messages && messages.map(message => (
                        <div key={message.id} style={{ borderStyle: 'solid', borderWidth: "1px", margin: '10px', padding: '5px', backgroundColor: 'yellow', boxShadow: '10px 10px 10px'}}>
                            <ProfileInfoDisplay user={message.author.user} picture={message.author.profile_picture} id={message.author.id} />
                            <ImageQuestion image={message.image} />
                            <p>{message.content}</p>
                            <p>Total Likes: {message.likes_count}</p>
                            <LikesButton id={message.id}/>
                            <p>{message.created_at}</p>
                            <DeleteButton author={message.author.user} id={message.id} />
                            <Comment message={message.id} id={message.id}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Images