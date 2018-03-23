import axios from 'axios';

export const deleteTag = (id) => {
  //DELETE /api/tags/:id
  return (dispatch) => {
    axios.delete(`/api/tags/${id}`)
      .then( res => dispatch({ type: 'DELETE_TAG', id, headers: res.headers }) )
  }
}

export const getTags = () => {
  return (dispatch) => {
    axios.get('/api/tags')
      .then( res => dispatch({ type: 'TAGS', tags: res.data, headers: res.headers }) )
  }
} 

export const addTag = (tag) => {
  // send tag to DB
  // if I get tag back,
    // update, store, and dispatch headers
  // if not tag back (aka trying to add a tag that already exisits)
    // still need to dispatch headers
  
  return (dispatch) => {
    axios.post('/api/tags', { tag })
      .then( res => {
        if (res.data)
          dispatch({ type: 'ADD_TAG', tag: res.data, headers: res.headers }) // creating things here but dont fully know what they do yet.
          // andythime you dispatch headers you don;t need to import it???
        else
          dispatch({ type: 'HEADERS', headers: res.headers })
        // dont need 'end' becuase we're not in ruby
        // still need to update headers even thoguh no tag was created. We still wnet to the DB.
      })
  }
}

// below is another way to write ^ destructuring the res etc.

// export const addTag = (tag) => {
//   return (dispatch) => {
//     axios.post('/api/tags', { tag })
//       .then( res => {
//         const { data: tag, headers } = res;
//         if (res.data)
//           dispatch({ type: 'ADD_TAG', tag, headers })
//         else
//           dispatch({ type: 'HEADERS', headers })
//       })
//   }
// }