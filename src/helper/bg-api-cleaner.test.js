/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import * as api from './bg-api-cleaner';

describe("cleanSearch", () => {
  it('should take in a searches and return an array of cleaned objects', () => {
    const mockRawSearchXML = {elements: [{elements: [{attributes:{id: '123'}, elements: [{attributes:{value: 'Captain Sonar'}}]}]}]}
    const cleanSearch = [{id: '123', name: 'Captain Sonar'}]
    expect(api.cleanSearch(mockRawSearchXML)).toEqual(cleanSearch);
  })
})

describe("cleanGameDetails", () => {
  it('should take in a game and return a cleaned game object', () => {
    const gameDetails = [
      {type: "element", name: "thumbnail", elements: [{type: "text", text: "https://cf.geekdo-images.com/images/pic3013621_t.png"}]},
      {type: "element", name: "image", elements: [{type: "text", text: "https://cf.geekdo-images.com/images/pic3013621.png"}]},
      {type: "element", name: "description", elements: [{type: "text", text: "At the bottom of the ocean, no one will hear you scream"}]}
    ]
    const mockRawGameXML = {elements: [{elements: [{attributes: {id: '123'}, elements: gameDetails}]}]}
    const cleanGame = { id: '123', thumbnail: 'https://cf.geekdo-images.com/images/pic3013621_t.png', image: 'https://cf.geekdo-images.com/images/pic3013621.png', description: 'At the bottom of the ocean, no one will hear you scream' };
    expect(api.cleanGameDetails(mockRawGameXML)).toEqual(cleanGame)
  })
})

describe.skip("fetchBoardGames", () => {
  it('should take in a url and throw an error if it is a bad call', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 500,
      })
    })
    api.convertXMLToJSON = jest.fn();

    expect(await api.fetchBoardGames('url')).toEqual('unable to load game data :(');

  })

  it('should take in a url, and call fetch', async() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        type: "cors", 
        url: "https://cors-anywhere.herokuapp.com/www.boardgamegeek.com/xmlapi2/search?query=pandemic", 
        redirected: false,
        status: 200, 
        ok: true
      });
    })

    console.log(api.convertXMLToJSON)
    api.convertXMLToJSON = jest.fn();
    await api.fetchBoardGames('https://cors-anywhere.herokuapp.com/www.boardgamegeek.com/xmlapi2/search?query=Mysterium')
    // expect(window.fetch).toHaveBeenCalled();
    expect(api.convertXMLToJSON).toHaveBeenCalled();
  })
})

describe('convertXMLToJSON', () => {

})
