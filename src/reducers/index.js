import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { gameReducer } from './gameReducer';
import { friendsReducer } from './friendsReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  favorites: gameReducer,
  friends: friendsReducer
});