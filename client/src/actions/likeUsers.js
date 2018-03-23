//WAS THIS NOW SEE BELOW FOR REFACTORING...
// import axios from 'axios';

// export const getUsersByTag = (tag) => {
//   return (dispatch) => {
//     axios.get(`/api/users/${tag}`)
//       .then( res => {
//         dispatch({ type: 'LIKE_USERS', users: res.data, headers: res.headers })
//       })
//   }
// }

// // /tags/2 & /tags/golfshoes mean the same thing to rails, so we'll talk about hat in routes later.

// export const getLikeUsers = () => {
//   return (dispatch) => {
//     axios.get('/api/like_users')
//       .then( res => {
//         dispatch({ type: 'LIKE_USERS', users: res.data, headers: res.headers }) // need a reducer that captures the 'LIKE_USERS'
//       })
//   }
// }

import axios from 'axios';

export const getLikeUsers = () => {
  return (dispatch) => {
    axios.get('/api/like_users')
      .then( res => dispatch({ type: 'LIKE_USERS', users: res.data, headers: res.headers }) )
  }
}

export const getUsersByTag = (tag, page = 1) => {
  return (dispatch) => {
    axios.get(`/api/users/${tag}?page=${page}`)
      .then( res => {
        const type = page > 1 ? 'LOAD_MORE' : 'LIKE_USERS'
        dispatch({ type, users: res.data, headers: res.headers }) 
      })
  }
}