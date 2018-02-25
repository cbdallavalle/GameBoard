import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapDispatchToProps } from './App';
import { db } from '../../firebase';
import { shallow } from 'enzyme';
import { mockData } from '../../mockData/mockData';

describe("App", () => {
  const mockLoginUser = jest.fn();
  const mockUpdateFavorites = jest.fn();
  const mockUpdateFriends = jest.fn();

  it('should match the snapshot', () => {
    const wrapper = shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    )
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should have a default state of authUser of null', () => {
    const wrapper = shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    , { disableLifecycleMethods: true })
    expect(wrapper.state()).toEqual({ authUser: null, error: '' })
  })

  it('should run loginUser on component did mount', () => {
    const wrapper = shallow(
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
    const wrapper = shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    )
    wrapper.instance().updateFriends = jest.fn();
    wrapper.instance().updateFavorites = jest.fn();
    wrapper.instance().loginUser({uid: '1234'});
    expect(mockLoginUser).toHaveBeenCalledWith({uid: '1234'});
    expect(wrapper.instance().updateFriends).toHaveBeenCalledWith('1234');
    expect(wrapper.instance().updateFavorites).toHaveBeenCalledWith('1234');
  })

  //updateFriends
  it('should set state with an error if error is caught', async() => {
    const wrapper = shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    )

    window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
      status: 500,
      error: new Error('unable to load friends')
    }))

    await wrapper.instance().updateFriends();
    expect(wrapper.state().error).toEqual('unable to load friends data')
  })

  it('updateFriends should call mockUpdateFriends if friends exist', async() => {
    const wrapper = shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    )
    db.getFriends = () => mockData.mockFriends;
    await wrapper.instance().updateFriends('123');
    expect(mockUpdateFriends).toHaveBeenCalledWith(mockData.mockFriends);
  })

  it('updateFriends should not call mockUpdateFriends if friends does not exist', async() => {
    const wrapper = shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    )
    wrapper.instance().props.updateFriends.mockClear()
    db.getFriends = (userId) => undefined;
    await wrapper.instance().updateFriends('123');
    expect(mockUpdateFriends).not.toHaveBeenCalled();
  })

  //updateFavorites
  it('updateFavorites should set state with an error if error is caught', async() => {
    const wrapper = shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    )

    window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
      status: 500,
      error: new Error('unable to load favorites data')
    }))

    await wrapper.instance().updateFavorites();
    expect(wrapper.state().error).toEqual('unable to load favorites data')
  })

  it('updateFavorites should call mockUpdateFavorites if favorites exist', async() => {
    const wrapper = shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    )
    db.getFavorites = () => mockData.mockFavorites;
    await wrapper.instance().updateFavorites('123');
    expect(mockUpdateFavorites).toHaveBeenCalledWith(mockData.mockFavorites);
  })

  it('updateFavorites should not call mockUpdateFavorites if favorites does not exist', async() => {
    const wrapper = shallow(
      <App 
        loginUser={mockLoginUser}
        updateFavorites={mockUpdateFavorites}
        updateFriends={mockUpdateFriends}
      />
    )
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
