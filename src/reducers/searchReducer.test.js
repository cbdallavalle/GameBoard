import { searchReducer } from './searchReducer';
import * as actions from '../actions/';

describe('SEARCH_GAMES', () => {
  it('should return the default state', () => {
    const expected = '';

    expect(searchReducer(undefined, {})).toEqual(expected)
  });

  it('should return the search as the state', () => {
    const expected = "Scythe";
    const currentState = "";

    expect(searchReducer(currentState, actions.searchGames("Scythe"))).toEqual("Scythe")
  })
})