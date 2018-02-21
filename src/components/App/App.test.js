import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapDispatchToProps } from './App';
import { shallow } from 'enzyme';

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
    expect(wrapper.state()).toEqual({ authUser: null })
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
