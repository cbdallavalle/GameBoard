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

// { 
    // email: "wren@wren.com",
    // firstName: "wrenom",
    // key: "YRrtMzWo0jNquYjLCQGT8ftqz703",
    // lastName: "little"
// }

//WORK IN PROGRESS
export const doWriteFriends = async (userId, friend) => {
  const { email, firstName, key, lastName } = friend;
  //grab userID and put into friend obj
  const friendToAdd = { [email]: {email, firstName, lastName, key } }
  db.ref('friends/').set(friendToAdd);

}

export const getFriends = async (userId) => {
  const snapshot = await db.ref('favorites').once('value');
  const value = await snapshot.val();
  console.log(getFriends)
}

export const getFavorites = async (userId) => {
  const snapshot = await onceGetUsers();
  const value = await snapshot.val();
  return value[userId].favorites;
}

//
// Other Entity APIs ...