/* eslint-disable */
import * as actions from './index';

describe("LOGIN_USER", () => {
  it('should return a type of LOGIN_USER', () => {
    const mockUser = {user: 'I AM A USER'}
    const expected = {
      type: "LOGIN_USER",
      user: mockUser
    }

    expect(actions.loginUser(mockUser)).toEqual(expected);
  })
})

describe("UPDATE_FAVORITES", () => {
  it('should return a type of UPDATE_FAVORITES', () => {
    const mockFavorites = {favorites: {name: 'Mysterium', description: 'coool game'}}
    const expected = {
      type: "UPDATE_FAVORITES",
      favorites: mockFavorites
    }
    
    expect(actions.updateFavorites(mockFavorites)).toEqual(expected);
  })

})

describe("UPDATE_FRIENDS", () => {
  it('should return a type of UPDATE_FRIENDS', () => {
    const mockFriends = ['123', '456']
    const expected = {
      type: "UPDATE_FRIENDS",
      friends: mockFriends
    }

    expect(actions.updateFriends(mockFriends)).toEqual(expected);
  })

})