import React from 'react';
import { shallow } from "enzyme";
import { Dashboard, mapStateToProps } from './Dashboard';
import { db } from '../../firebase';
import { mockData } from '../../mockData/mockData';

describe('Dashboard', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(
      <Dashboard 
        favorites={{}}
        user={{}}
      />
    )
    expect(wrapper).toMatchSnapshot();
  })

  it('should have a default state of an empty object for friendsFavorites', () => {
    const wrapper = shallow(
      <Dashboard         
        favorites={{}}
        user={{}}
      />
    )
    expect(wrapper.state()).toEqual({ friendsFavorites: {}, error: '' })
  })

  //updateFavorites
  it('updateFavorites will set friendsFavorites to an array of friends', async() => {
    const wrapper = shallow(
      <Dashboard         
        favorites={{}}
        user={{ uid: '123' }}
      />
    )
    db.getFriendsFavorites = () => mockData.mockFriendsFavorites;
    await wrapper.instance().updateFavorites();
    expect(wrapper.state().friendsFavorites).toEqual(mockData.mockFriendsFavorites )
  })
})

describe("mapStateToProps", () => {
  const initialState = {
    favorites: mockData.mockFavorites,
    user: mockData.mockMSTPUser.user
  }

  const expected = {
    favorites: mockData.mockFavorites,
    user: mockData.mockMSTPUser.user
  }

  it('mapStateToProps should take in state and return an object', () => {
    expect(mapStateToProps(initialState)).toEqual(expected);
  })
})