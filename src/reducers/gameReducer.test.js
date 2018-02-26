/* eslint-disable */
import { gameReducer } from './gameReducer';
import * as actions from '../actions/';
import { mockData } from '../mockData/mockData'

describe("gameReducer", () => {
  const state = {};

  it('should return default state if action is empty', () => {
    expect(gameReducer(state, {})).toEqual(state);
  })

  it('should return the favorites if action has a type of UPDATE_FAVORITES', () => {
    const mockFavorite = { 'Race for the Galaxy': {game: 'info'}}

    expect(gameReducer(state, actions.updateFavorites(mockFavorite))).toEqual(mockData.mockFavorites);
  })
})