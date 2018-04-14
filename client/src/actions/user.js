//made a new action called user bc it didn;t make sense to put it in auth, but we will use the same reducer as auth

// we're returning a thunk
//the second param of axios.put is either param info (name: 'Liz') or a file, not both, therefore we have to tinr the file into someting we can pass in with the params

import axios from 'axios';

export const updateUser = (id, user) => {
  return (dispatch) => {
    let { name, email, gamertag, file = '' } = user;
    let data = new FormData()
    data.append('file', file)
    let url = `/api/users/${id}?name=${name}&email=${email}&gamertag=${gamertag}`
    axios.put(url, data)
      .then( res => { dispatch({ type: 'USER', user: res.data, headers: res.headers })
      });
  }
}
  //axios.put(url-first-param, data-second-param)
