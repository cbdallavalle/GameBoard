import React from 'react';
import { shallow } from "enzyme";
import { Dashboard, mapStateToProps } from './Dashboard';
import { db } from '../../firebase';
import { mockData } from '../../mockData/mockData';

describe('Dashboard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(f
      <Dashboard 
        favorites={{}}
        user={{ uid: '123' }}
      />
    )
  })

  it('should match the snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  })

  it('should have a default state of an empty object for friendsFavorites and error as an empty string', () => {

    expect(wrapper.state()).toEqual({ friendsFavorites: {}, error: '' })
  })

  //updateFavorites
  it('updateFavorites should set state with an error if an error is caught', async() => {

    await wrapper.instance().updateFavorites();
    expect(wrapper.state().error).toEqual('unable to load friends data')
  })

  it('updateFavorites will set friendsFavorites to an array of friends', async() => {

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