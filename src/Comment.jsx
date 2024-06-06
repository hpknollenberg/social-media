import { createMessage, getComments, createComment, baseUrl, deleteComment, updateCommentLikes } from "./api"
import { AuthContext, ProfileContext, UserNameContext, OtherProfileContext } from "./context"
import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"


const Comment = ({message, id}) => {
    const { auth } = useContext(AuthContext)
    const {profile, setProfile} = useContext(ProfileContext)
    const [image, setImage] = useState("")
    const [content, setContent] = useState("")
    const [comments, setComments] = useState([])
    const {userName, setUserName} = useContext(UserNameContext)
    const {otherProfile, setOtherProfile} = useContext(OtherProfileContext)



    useEffect(() => {
        const getCommentsNow = () => {
            if (auth.accessToken) {
                getComments({auth})
                    .then((response) => {
                        setComments(response.data)
                    })
                    .catch(error => console.log('ERROR: ', error))
            }
        }

        const intervalFunc = setInterval(() => {
            getCommentsNow()
        }, 1000)
        
        getCommentsNow()
        return () => clearInterval(intervalFunc)
        
    }, [])



    const submit = () => {
        createComment({ 
            auth,
            content,
            image,
            profile,
            message
        })
            .then((response) => {
                console.log("MESSAGE: ", response)
            })
            .catch(error => console.log('ERROR: ', error))
        
        setImage("")
        setContent("")
        console.log("message: ", message)
    }

    const deleteButtonFunc = (id) => {
        console.log(id)
        deleteComment({ auth, id })
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
                <button style={{ backgroundColor: 'blue', color: 'white', borderRadius: '10px' }} onClick={() => {updateCommentLikes({ auth, id })}}>Like</button>
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
        <div className=''>   
            <hr></hr>           
            <div style={{ margin: "5px" }}>
                <input 
                    value = { content }
                    onChange={e => setContent(e.target.value)}
                />
            </div>
            <div style={{ margin: "5px" }}>
                <input style={{backgroundColor: 'yellow'}}
                    accept='image/*'
                    type='file'
                    onChange={e => setImage(e.target.files[0])}
                />
            </div>
            <div style={{ margin: "5px" }}>
                <button onClick={() => {submit()}}>
                    Post Comment</button>
            </div>
            <hr></hr>
                {comments && comments.filter((x) => x.message.id === id).map(cont => (
                    <div key={cont.id} style={{ borderStyle: 'solid', borderWidth: "1px", margin: '10px', padding: '5px', backgroundColor: 'pink', boxShadow: '10px 10px 10px'}}>
                        <ProfileInfoDisplay user={cont.author.user} picture={cont.author.profile_picture} id={cont.author.id} />
                        <ImageQuestion image={cont.image} />
                        <p>{cont.content}</p>
                        <p>Total Likes: {cont.likes_count}</p>
                        <LikesButton id={cont.id}/>
                        <p>{cont.created_at}</p>
                        <DeleteButton author={cont.author.user} id={cont.id} />
                    </div>
                ))}
        </div>
    )
}


export default Comment