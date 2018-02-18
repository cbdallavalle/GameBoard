import { userReducer } from './userReducer';
import * as actions from '../actions/';

describe("userReducer", () => {
  const state = {};

  it('should return default state if action is empty', () => {
    expect(userReducer(state, {})).toEqual(state);
  })

  it('should return the user if action has a type of LOGIN_USER', () => {
    const mockUser = {user: 'I AM A USER'}
    expect(userReducer(state, actions.loginUser(mockUser))).toEqual(mockUser);
  })
})