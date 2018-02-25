import React from 'react';
import { Search, mapStateToProps, mapDispatchToProps } from './Search';
import { shallow } from 'enzyme';
import { db } from '../../firebase';
import * as api from '../../helper/bg-api-cleaner';
import { mockData } from '../../mockData/mockData'

describe('triggerSearch', () => {
  let wrapper;
  const mockUpdateFavorites = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Search 
        user={{}}
        updateFavorites={mockUpdateFavorites}
      />);
  })

  it('should start with default state', () => {
    expect(wrapper.state()).toEqual(mockData.mockDefaultSearchState);
  })

  //handleChange
  it('handleChange should set state from a mockEvent', () => {
    wrapper.instance().handleChange(mockData.mockSearchEvent);
    expect(wrapper.state().search).toEqual('Meeple Circus');
  })

  //handleSubmit
  it('handleSubmit should set state to an empty string and loading to true', () => {
    wrapper.instance().triggerSearch = jest.fn();
    wrapper.instance().handleSubmit(mockData.mockSearchEvent);
    expect(wrapper.state().search).toEqual('');
    expect(wrapper.state().loading).toEqual(true);
  })

  //triggerSearch
  it('Trigger search should set state with an array of games', async() => {
    
    api.fetchBoardGames = jest.fn();
    api.cleanSearch = (result) => mockData.mockSearch;
    await wrapper.instance().triggerSearch('Mysterium');
    expect(wrapper.state().games).toEqual(mockData.mockSearch)
  });

  //handleChooseGame
  it('handleChooseGame should set state with a game', async () => {

    api.fetchBoardGames = jest.fn();
    api.cleanGameDetails = (result) => (mockData.mockSearchGame);
    await wrapper.instance().handleChooseGame(mockData.mockSearch[0])
    expect(wrapper.state().game).toEqual(mockData.mockSearchGame)
  })

  //addGameToFavorites
  it('addGameToFavorites should call updateFavorites', async() => {

    db.doAddFavoriteData = jest.fn();
    db.getFavorites = (userId) => mockData.mockFavorites;
    await wrapper.instance().addGameToFavorites();
    expect(mockUpdateFavorites).toHaveBeenCalledWith(mockData.mockFavorites)
  })

  //displayAllGames
  it('displayAllGames and displayGame should match the snapshot if games in state has length', () => {
    wrapper.setState({games: mockData.mockSearch})
    expect(wrapper).toMatchSnapshot();
  })

  it('displayAllGames should match the snapshot if games in state has no length', () => {
    expect(wrapper).toMatchSnapshot();
  })

  //displayGame
  it('displayGame should match the snapshot if game in state exists', () => {
    wrapper.setState({game: mockData.mockSearchGame});
    expect(wrapper).toMatchSnapshot();
  })
})

describe('mapStateToProps', () => {
  it('should take in state and return a user object', () => {
    expect(mapStateToProps(mockData.mockMSTPUserState)).toEqual(mockData.mockMSTPUser)
  })
})

describe('mapDispatchToProps', () => {
  it('should call dispatch when updateFavorites is called', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.updateFavorites();
    expect(mockDispatch).toHaveBeenCalled();
  })
})