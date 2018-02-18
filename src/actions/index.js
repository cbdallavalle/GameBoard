export const loginUser = user => ({
  type: 'LOGIN_USER',
  user
})

export const updateFavorites = favorites => ({
  type: 'UPDATE_FAVORITES',
  favorites
}) 



// export const searchGames = search => ({
//   type: 'SEARCH_GAMES',
//   search
// });