import * as actions from './index';

describe("SEARCH_GAMES", () => {
  it('should return a type of SEARCH_GAMES', () => {
    const string = "Meeple Circus"
    const expected = {
      type: "SEARCH_GAMES",
      search: "Meeple Circus"
    }

    expect(actions.searchGames(string)).toEqual(expected);
  })
})