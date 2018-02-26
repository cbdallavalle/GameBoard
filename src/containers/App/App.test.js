/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapDispatchToProps } from './App';
import { auth, db } from '../../firebase';
import { shallow } from 'enzyme';
import { mockData } from '../../mockData/mockData';

describe("App", () => {
  let wrapper;
  const mockLoginUser = jest.fn();
  const mockUpdateFavorites = jest.fn();
  const mockUpdateFriends = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    , { disableLifecycleMethods: true } )
  })

  it('should match the snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
  
  it('should have a default state of authUser of null', () => {

    expect(wrapper.state()).toEqual({ authUser: null, error: '' })
  })

  it('should run loginUser on component did mount', async() => {
    wrapper = await shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    )

    expect(mockLoginUser).toHaveBeenCalled();
  })

  //loginUser
  it('loginUser should call loginUser, updateFriends, and updateFavorites', () => {
    wrapper.instance().updateFriends = jest.fn();
    wrapper.instance().updateFavorites = jest.fn();
    wrapper.instance().loginUser({uid: '1234'});

    expect(mockLoginUser).toHaveBeenCalledWith({uid: '1234'});
    expect(wrapper.instance().updateFriends).toHaveBeenCalledWith('1234');
    expect(wrapper.instance().updateFavorites).toHaveBeenCalledWith('1234');
  })

  //updateFriends
  it('should set state with an error if error is caught', async() => {

    db.getFriends = jest.fn().mockImplementation(() => {
      throw new Error('unable to load friends data')
    })

    await wrapper.instance().updateFriends();
    expect(wrapper.state().error).toEqual('unable to load friends data')
  })

  it('updateFriends should call mockUpdateFriends if friends exist', async() => {

    db.getFriends = () => mockData.mockFriends;
    await wrapper.instance().updateFriends('123');
    expect(mockUpdateFriends).toHaveBeenCalledWith(mockData.mockFriends);
  })

  it('updateFriends should not call mockUpdateFriends if friends does not exist', async() => {

    wrapper.instance().props.updateFriends.mockClear()
    db.getFriends = (userId) => undefined;
    await wrapper.instance().updateFriends('123');
    expect(mockUpdateFriends).not.toHaveBeenCalled();
  })

  //updateFavorites
  it('updateFavorites should set state with an error if error is caught', async() => {

    db.getFavorites = jest.fn().mockImplementation(() => {
      throw new Error('unable to load favorites data')
    })

    await wrapper.instance().updateFavorites();
    expect(wrapper.state().error).toEqual('unable to load favorites data')
  })

  it('updateFavorites should call mockUpdateFavorites if favorites exist', async() => {

    db.getFavorites = () => mockData.mockFavorites;
    await wrapper.instance().updateFavorites('123');
    expect(mockUpdateFavorites).toHaveBeenCalledWith(mockData.mockFavorites);
  })

  it('updateFavorites should not call mockUpdateFavorites if favorites does not exist', async() => {

    wrapper.instance().props.updateFavorites.mockClear()
    db.getFavorites = (userId) => undefined;
    await wrapper.instance().updateFavorites('123');
    expect(mockUpdateFavorites).not.toHaveBeenCalled();
  })
})

describe("mapDispatchToProps", () => {
  
  it('should call dispatch when loginUser is called', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.loginUser();
    expect(mockDispatch).toHaveBeenCalled();    
  })

  it('should call dispatch when updateFavorites is called', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.updateFavorites();
    expect(mockDispatch).toHaveBeenCalled();    
  })

  it('should call dispatch when updateFriends is called', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.updateFriends();
    expect(mockDispatch).toHaveBeenCalled();    
  })
})
