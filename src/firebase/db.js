import { db } from './firebase';

export const doCreateUser = (id, firstName, lastName, email) =>
  db.ref(`users/${id}`).set({
    user: {
      id,
      firstName,
      lastName,
      email,
    }
  });

export const onceGetUsers = async () => {
  try {
    const snapshot = await db.ref('users').once('value');
    if (snapshot.status < 300) {
      const value = await snapshot.val();
      return value
    } else {
      throw new Error('unable to fetch users')
    }
  } catch (error) {
    throw new Error('unable to fetch users')
  }
}

export const doWriteFavoriteData = async (userId, newFavorites) => {
  db.ref('users/' + userId + '/favorites').set(newFavorites);
}

export const doAddFavoriteData = async (userId, favorite) => {
  const existingFavorites = await getFavorites(userId);
  const favoriteToAdd = checkFavoriteDuplication(existingFavorites, favorite);
  doWriteLastFavoritedData(userId, favorite)
  const newFavorites = {...existingFavorites, ...favoriteToAdd }
  this.doWriteFavoriteData(userId, newFavorites)
}

export const doDeleteFavoriteData = async (userId, favorite) => {
  const existingFavorites = await getFavorites(userId);
  delete existingFavorites[favorite.name]
  this.doWriteFavoriteData(userId, existingFavorites)
}

export const doWriteLastFavoritedData = async (userId, favorite) => {
  db.ref('users/' + userId + '/lastFavorited').set(favorite);
}

export const checkFavoriteDuplication = (existingFavorites, favorite) => {
  const { name, id, description, image, thumbnail } = favorite;
  const review = "No review - click to add one";
  const favoriteToAdd = { [name]: { id, description, image, thumbnail, name, review } }
  return existingFavorites && existingFavorites[favorite.name] ? {} : favoriteToAdd
}

export const doWriteFriendsData = async (userId, friendId) => {
  try {
    const friends = await getFriends(userId);
    if (friends && !friends.includes(friendId)) {
      friends.push(friendId);
      db.ref('users/' + userId + '/friends').set(friends); 
    } else if (!friends) {
      db.ref('users/' + userId + '/friends').set([friendId]); 
    }
  } catch (error) {
    throw new Error ('unable to add friend')
  }
}

export const getFriends = async (userId) => {
  const snapshot = await db.ref('users').once('value');
  const value = await snapshot.val();
  return value[userId].friends
}

export const getFavorites = async (userId) => {
  const value = await onceGetUsers();
  return value[userId].favorites;
}

export const getFriendsFavorites = async (userId) => {
  const friends = await getFriends(userId);
  const value = await onceGetUsers();
  if(friends) {
    return friends.reduce( (accu, friendId) => {
      if(value[friendId].lastFavorited) {
        accu[value[friendId].user.firstName] = value[friendId].lastFavorited
      }
      return accu
    }, {} )  
  } else {
    return {}
  }
}

export const doWriteReviewData = async (userId, favorite, review) => {
  const { name } = favorite;
  const reviewedGame = {...favorite, review}
  db.ref('users/' + userId + '/favorites/' + name).set(reviewedGame);
  await doWriteLastFavoritedData(userId, reviewedGame)
}