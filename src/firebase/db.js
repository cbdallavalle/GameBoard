import { db } from './firebase';

export const doCreateUser = (id, firstName, lastName, email) =>
  db.ref(`users/${id}`).set({
    user: {
      id,
      firstName,
      lastName,
      email
    }
  });

export const onceGetUsers = async () => {
  try {
    const snapshot = await db.ref('users').once('value');
    const value = await snapshot.val();
    return value;
  } catch (error) {
    throw new Error('unable to fetch users');
  }
};

export const doWriteFavoriteData = async (userId, newFavorites) => {
  try {
    db.ref('users/' + userId + '/favorites').set(newFavorites);
  } catch (error) {
    throw new Error('unable to write favorite data');
  }
};

export const doAddFavoriteData = async (userId, favorite) => {
  try {
    const existingFavorites = await getFavorites(userId);
    const favoriteToAdd = checkFavoriteDuplication(existingFavorites, favorite);
    doWriteLastFavoritedData(userId, favorite);
    const newFavorites = {...existingFavorites, ...favoriteToAdd };
    doWriteFavoriteData(userId, newFavorites);
  } catch (error) {
    throw new Error('unable to add favorite data');
  }
};

export const doDeleteFavoriteData = async (userId, favorite) => {
  try {
    const existingFavorites = await getFavorites(userId);
    delete existingFavorites[favorite.name];
    doWriteFavoriteData(userId, existingFavorites);
  } catch (error) {
    throw new Error('unable to delete');
  }
};

export const doWriteLastFavoritedData = async (userId, favorite) => {
  db.ref('users/' + userId + '/lastFavorited').set(favorite);
};

export const doWriteLastFavoritedReview = async (userId, review) => {
  db.ref('users/' + userId + '/lastFavorited/' + 'review').set(review);
}

export const checkFavoriteDuplication = (existingFavorites, favorite) => {
  const { name, id, description, image, thumbnail } = favorite;
  const review = "No review - click to add one";
  const favoriteToAdd = { 
    [name]: { id, description, image, thumbnail, name, review } 
  };
  return ( existingFavorites && 
    existingFavorites[favorite.name] 
    ? {} 
    : favoriteToAdd );
};

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
    throw new Error('unable to add friend');
  }
};

export const getFriends = async (userId) => {
  try {
    const value = await onceGetUsers();
    return value ? value[userId].friends : [];
  } catch (error) {
    throw new Error('unable to load friends data');
  }
};

export const getFavorites = async (userId) => {
  try {
    const value = await onceGetUsers();
    return value ? value[userId].favorites : {};
  } catch (error) {
    throw new Error('unable to load favorites data');
  }
};

export const getFriendsFavorites = async (userId) => {
  const friends = await getFriends(userId);
  const value = await onceGetUsers();
  if (friends) {
    return friends.reduce( async(accu, friendId) => {
      if (value[friendId].lastFavorited) {
        const review = await doGetLastReviewedData(friendId);
        accu[value[friendId].user.firstName] = {
          game: value[friendId].lastFavorited,
          review
        };
      }
      return accu;
    }, {} ); 
  } else {
    return {};
  }
};

export const doWriteReviewData = async (userId, favorite, review) => {
  try {
    const { name } = favorite;
    db.ref('users/' + userId + '/reviews/' + name).set(review);
    await doWriteLastFavoritedData(userId, favorite);
    await doWriteLastFavoritedReview(userId, review);
  } catch (error) {
    throw new Error('unable to process review');
  }
};

export const doGetReviewData = async(userId, name) => {
  try {
    const users = await this.onceGetUsers();
    return users[userId].reviews[name];
  } catch (error) {
    throw new Error('unable to get reviews');
  }
}

export const doGetLastReviewedData = async(userId) => {
  const users = await this.onceGetUsers();
  return users[userId].lastFavorited.review;
}