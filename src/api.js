import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000"

export const getToken = ({ auth, username, password }) => {
  axios.post(`${baseUrl}/token/`, {
    username: username,
    password: password
  }).then(response => {
    console.log('RESPONSE: ', response)
    auth.setAccessToken(response.data.access)
  })
  .catch(error => {
    console.log('ERROR: ', error)
    auth.setAccessToken(undefined)
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
    console.log('PROFILE: ', response)
    return response
  })
  .catch(error => {
    console.log('ERROR: ', error)
    auth.setAccessToken(undefined)
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


export const getImages = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-images`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
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


export const createImage = ({ title, image, auth }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-image/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      image,
      title,
    }
  })
}


export const createMessage = ({ auth, message, profile }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-message/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      message,
      profile
    }
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