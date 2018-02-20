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

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doWriteFavoriteData = async (userId, favorite) => {
  const existingFavorites = await getFavorites(userId);
  const favoriteToAdd = checkFavoriteDuplication(existingFavorites, favorite)
  const newFavorites = {...existingFavorites, ...favoriteToAdd }
  doWriteLastFavoritedData(userId, favorite)
  db.ref('users/' + userId + '/favorites').set(newFavorites);
}

export const doWriteLastFavoritedData = async (userId, favorite) => {
  db.ref('users/' + userId + '/lastFavorited').set(favorite);
}

export const checkFavoriteDuplication = (existingFavorites, favorite) => {
  const { name, id, description, image, thumbnail } = favorite;
  const favoriteToAdd = { [name]: { id, description, image, thumbnail, name } }
  return existingFavorites[favorite.name] ? {} : favoriteToAdd
}

export const doWriteFriendsData = async (userId, friendId) => {
  const friends = await getFriends(userId);
  if (friends && !friends.includes(friendId)) {
    friends.push(friendId);
    db.ref('users/' + userId + '/friends').set(friends); 
  } else if (!friends) {
    db.ref('users/' + userId + '/friends').set([friendId]); 
  }
}

export const getFriends = async (userId) => {
  const snapshot = await db.ref('users').once('value');
  const value = await snapshot.val();
  return value[userId].friends
}

export const getFavorites = async (userId) => {
  const snapshot = await onceGetUsers();
  const value = await snapshot.val();
  return value[userId].favorites;
}

export const getFriendsFavorites = async (userId) => {
  const friends = await getFriends(userId);
  const snapshot = await onceGetUsers();
  const value = await snapshot.val();
  return friends.reduce( (accu, friendId) => {
    if(value[friendId].lastFavorited) {
      accu[value[friendId].user.firstName] = value[friendId].lastFavorited
    }
    return accu
  }, {} )
}

// YRrtMzWo0jNquYjLCQGT8ftqz703
// :
// favorites
// :
// {Arkham Horror: The Card Game: {…}, Captain Sonar: {…}, Codenames: {…}, Meeple Circus: {…}, Munchkin: {…}, …}
// friends
// :
// (2) ["YRrtMzWo0jNquYjLCQGT8ftqz703", "GZZGrEW9aYXzbxrdphXuq04ng6E3"]
// lastFavorited
// :
// {description: "In the 1920s, Mr. MacDowell, a gifted astrologist,…not, well, perhaps you can try again...&#10;&#10;", id: "181304", image: "https://cf.geekdo-images.com/images/pic2601683.jpg", name: "Mysterium", thumbnail: "https://cf.geekdo-images.com/images/pic2601683_t.jpg"}
// user
// :
// {email: "wren@wren.com", firstName: "wrenom", id: "YRrtMzWo0jNquYjLCQGT8ftqz703", lastName: "little"}