import axios from 'axios'

export const baseUrl = "https://social-media-back-end.fly.dev"

// export const baseUrl = "http://127.0.0.1:8000"


export const createComment = ({ auth, content, image, profile, message}) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-comment/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      content,
      image,
      profile,
      message
    }
  })
}


export const createMessage = ({ auth, message, image, profile }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-message/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      message,
      image,
      profile
    }
  })
}


export const createUser = ({ username, password, firstName, lastName }) => {
  axios({
    method: 'post',
    url: `${baseUrl}/create-user/`, 
    data: {
      username,
      password: password,
      first_name: firstName,
      last_name: lastName
    }
  }).then(response => {
    console.log('CREATE USER: ', response)
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
}


export const deleteMessage = ({ auth, id }) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-message/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      id
    }
  })
}


export const deleteComment = ({ auth, id }) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-comment/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      id
    }
  })
}


export const editProfilePicture = ({ auth, image }) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/profile-picture/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      image
    }
  })
}


export const fetchUser = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/profile/`, 
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  }).then(response => {
    return response
  })
  .catch(error => {
    console.log('FETCH USER ERROR: ', error)
    auth.setAccessToken([])
  })
}


export const fetchOtherUser = ({ auth, otherProfile }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/other-profile/${otherProfile}`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  }).then(response => {
    return response
  }).catch(error => {
    console.log('OTHER PROFILE ERROR: ', error)
  })
}


export const getMessages = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-messages`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}


export const getComments = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-comments`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}


export const getToken = ({ auth, username, password }) => {
  return axios.post(`${baseUrl}/token/`, {
    username: username,
    password: password
  }).then(response => {
    auth.setAccessToken(response.data.access)
    return response
  })
  .catch(error => {
    console.log('ERROR: ', error)
    auth.setAccessToken([])
  })
}


export const updateCommentLikes = ({ auth, id }) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/update-comment-likes/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      id
    }
  }) 
    .then(response => {
      return response
    })
    .catch(error => {
      console.log("COMMENT LIKES ERROR: ", error)
    })
}


export const updateLikes = ({ auth, id }) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/update-likes/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      id
    }
  }) 
    .then(response => {
      return response
    })
    .catch(error => {
      console.log("LIKES ERROR: ", error)
    })
}




