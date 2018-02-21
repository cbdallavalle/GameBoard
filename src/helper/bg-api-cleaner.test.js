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
  it('should take in a url, return a fetch of XML and return JSON', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: {response: {}}
      })
    })
  })
})
