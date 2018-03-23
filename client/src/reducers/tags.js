
    //we need a refucer that wil catch the delete user action

    // DELETE_TAG :
    // take whats in my state [{ id: 1, name: 'mario'},
    // { id: ....}]
    // and give me back a new arrray without the one I mentioned. we are making a new copy of our redux store eveyrtie, so just leave the old one behind in teh past

const tags = ( state = [], action ) => {
  switch (action.type) {
    case 'DELETE_TAG':
      return state.filter( t => t.id !== action.id )
    case 'TAGS':
      return action.tags
    case 'ADD_TAG':
      return [...state, action.tag];
    default:
      return state;
  }
}

export default tags;
//remember to add this to the index.js reducer as well!!!