import { db } from './firebase';

// User API

export const doCreateUser = (id, firstName, lastName, email) =>
  db.ref(`users/${id}`).set({
    user: {
      firstName,
      lastName,
      email,
    }
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doWriteFavoriteData = async (userId, favorite) => {
  const { name, id, description, image, thumbnail } = favorite;
  const existingFavorites = await getFavorites(userId);
  const favoriteToAdd = { [name]: { id, description, image, thumbnail, name } }
  const newFavorites = {...existingFavorites, ...favoriteToAdd }
  db.ref('users/' + userId + '/favorites').set(newFavorites);
}

export const doWriteFriends = async (userId, friend) => {
  console.log(friend)
}

export const getUsers = async (userId) => {
  const snapshot = await onceGetUsers();
  const value = await snapshot.val();
  return value[userId].friends;
}

export const getFavorites = async (userId) => {
  const snapshot = await onceGetUsers();
  const value = await snapshot.val();
  return value[userId].favorites;
}

//
// Other Entity APIs ...