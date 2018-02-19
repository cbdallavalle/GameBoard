export const friendsReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_FRIENDS':
      return action.friends;
    default:
      return state
  }
}