export const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_FAVORITES' :
      return action.favorites
    default:
      return state
  }
}