// did you add this to the index reducer???

const likeUsers = ( state = { users: [], total_pages: 1}, action ) => {
  switch (action.type) {
    case 'LIKE_USERS':
      return action.users
    case 'LOAD_MORE':
      return {
        ...state,
        users: [...state.users, ...action.users.users ]
      }
    default:
      return state 
  }
}

export default likeUsers;

// remeber that for every reducer there is alwasy a default case that returns state. BC...? it needs to return the state, otherwise the like_users dont get left behind.
//gotta remeber to add this or nothing works, everything breaks and none of the errors tell you anything!
