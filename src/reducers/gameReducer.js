export const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_FAVORITES' :
      if (action.favorites) {
        return action.favorites;
      } else {
        return state;
      }
    default:
      return state;
  }
};