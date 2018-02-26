/* eslint-disable */
import { friendsReducer } from './friendsReducer';
import * as actions from '../actions/';
import { mockData } from '../mockData/mockData'

describe("friendsReducer", () => {
  const state = [];

  it('should return default state if action is empty', () => {
    
    expect(friendsReducer(state, {})).toEqual(state);
  })

  it('should return the favorites if action has a type of UPDATE_FAVORITES', () => {
    const mockFriends = ['123', '456', '778'];

    expect(friendsReducer(state, actions.updateFriends(mockFriends))).toEqual(mockData.mockFriends);
  })
})