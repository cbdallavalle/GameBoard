import { db } from './firebase';

// User API

export const doCreateUser = (id, firstName, lastName, email) =>
  db.ref(`users/${id}`).set({
    user: {
      id,
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
export const doWriteFriendsData = async (userId, friendId) => {
  const friends = getFriends(userId);
  friends.push(friendId);
  db.ref('users/' + userId + '/friends').set(friends);
}

export const getFriends = async (userId) => {
  const snapshot = await db.ref('users').once('value');
  const value = await snapshot.val();
  console.log(value[userId].friends)
}

export const getFavorites = async (userId) => {
  const snapshot = await onceGetUsers();
  const value = await snapshot.val();
  return value[userId].favorites;
}

//
// Other Entity APIs ...