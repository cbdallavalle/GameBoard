import React from 'react';
import { Search } from './Search';
import { shallow } from 'enzyme';
import * as api from '../../helper/bg-api-cleaner';

describe('triggerSearch', () => {
  const defaultState = {
    games: [],
    search: '',
    game: {}
  }
  const mockEvent = {
    preventDefault: () => {},
    target: {
      name: 'search',
      value: 'Meeple Circus'
    }
  }
  const mockSearch = [{id: '123', name: 'Mysterium'}]
  const mockGame = { id: '123', name: 'Mysterium', thumbnail: 'src', image: 'src', description: 'A mystery game with pictures' };

  it('should start with default state', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.state()).toEqual(defaultState);
  })

  it('handleChange should set state from a mockEvent', () => {
    const wrapper = shallow(<Search />);
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state().search).toEqual('Meeple Circus');
  })

  it('handleSubmit should set state to an empty string', () => {
    const wrapper = shallow(<Search />);
    wrapper.instance().triggerSearch = jest.fn();
    wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state()).toEqual(defaultState)
  })

  it('Trigger search should set state with an array of games', async() => {
    const wrapper = shallow(<Search />)
    
    api.fetchBoardGames = jest.fn();
    api.cleanSearch = (result) => mockSearch;
    await wrapper.instance().triggerSearch('Mysterium');
    expect(wrapper.state().games).toEqual(mockSearch)
  });

  it('handleChooseGame should set state with a game', async () => {
    const wrapper = shallow(<Search />)

    api.fetchBoardGames = jest.fn();
    api.cleanGameDetails = (result) => ([mockGame]);
    await wrapper.instance().handleChooseGame(mockSearch[0])
    expect(wrapper.state().game).toEqual(mockGame)
  })

  it('displayAllGames and displayGame should match the snapshot if games in state has length', () => {
    const wrapper = shallow(<Search />)
    wrapper.setState({games: mockSearch})
    expect(wrapper).toMatchSnapshot();
  })

  it('displayAllGames should match the snapshot if games in state has no length', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper).toMatchSnapshot();
  })

  it('displayGame should match the snapshot if game in state exists', () => {
    const wrapper = shallow(<Search />)
    wrapper.setState({game: mockGame});
    expect(wrapper).toMatchSnapshot();
  })
})





// describe('mapStateToProps', () => {
//   it('should map search to props', () => {
//     const mapped = mapStateToProps({ search: "Onirim"});

//     expect(mapped.search).toEqual("Onirim")
//   })
// })