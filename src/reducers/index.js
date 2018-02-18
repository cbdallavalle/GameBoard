import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { gameReducer } from './gameReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  games: gameReducer
});