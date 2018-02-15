export const searchReducer = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_GAMES':
      return action.search;
    default:
      return state;
  }
};