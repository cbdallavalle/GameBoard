/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { db } from '../../firebase';
import { AddFriends, mapStateToProps, mapDispatchToProps } from './AddFriends';
import { mockData } from '../../mockData/mockData';

describe("AddFriends", () => {
  const mockUpdateFriends = jest.fn();
  const initialState = {      
    search: '',
    usersSearched: [],
    allUsers: [],
    error: ''
  }

  it('should start with a default state', () => {
    const wrapper = shallow(
      <AddFriends 
        user={{}} 
        updateFriends={mockUpdateFriends}
      />, {disableLifeCycleMethods: true} )
    expect(wrapper.state()).toEqual(initialState);
  })

  //getAllUsers
  it('getAllUsers should update state with an error message if an error is caught', async() => {
    const wrapper = await shallow(
      <AddFriends 
        user={{uid: 'GZZGrEW9aYXzbxrdphXuq04ng6E3'}} 
        updateFriends={mockUpdateFriends}
      /> )

    db.onceGetUsers = jest.fn().mockImplementation(() => {
      throw new Error('unable to fetch users')
    })

    await wrapper.instance().getAllUsers();

    expect(wrapper.state().error).toEqual('unable to fetch users')
  })

  it('getAllUsers should update state to have all users', async() => {
    const wrapper = await shallow(
      <AddFriends 
        user={{uid: 'GZZGrEW9aYXzbxrdphXuq04ng6E3'}} 
        updateFriends={mockUpdateFriends}
      /> )
    
    db.onceGetUsers = () => mockData.mockUsers;
    await wrapper.instance().getAllUsers();
    expect(wrapper.state().allUsers).toEqual(mockData.mockAllUsersWithoutSearcher)
  })

  //handleChange
  it('handleChange should find the users that match the search', async() => {
    const wrapper = await shallow(
      <AddFriends 
        user={{uid: 'GZZGrEW9aYXzbxrdphXuq04ng6E3'}} 
        updateFriends={mockUpdateFriends}
      /> )
    const mockEvent = {target:{value: 'k'}}
    await wrapper.setState({ allUsers: mockData.mockAllUsers });
    await wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state().usersSearched).toEqual(mockData.mockAllUsersWithoutSearcher)
  })

  it('handleChange should return an empty array if no users match the search', async() => {
    const wrapper = await shallow(
      <AddFriends 
        user={{uid: 'GZZGrEW9aYXzbxrdphXuq04ng6E3'}} 
        updateFriends={mockUpdateFriends}
      /> )
    const mockEvent = {target:{value: 'zzzz'}}
    await wrapper.setState({ allUsers: mockData.mockAllUsers });
    await wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state().usersSearched).toEqual([])
  })

  //displayFriends
  it('displayFriends should match the snapshot if usersSearched has length', async() => {
    const wrapper = await shallow(
      <AddFriends 
        user={{uid: 'GZZGrEW9aYXzbxrdphXuq04ng6E3'}} 
        updateFriends={mockUpdateFriends}
      /> )
    wrapper.setState({usersSearched: ['user', 'user']})
    expect(wrapper).toMatchSnapshot();
  })

  it('displayFriends should match the snpashot if usersSearched does not have length', async() => {
    const wrapper = await shallow(
      <AddFriends 
        user={{uid: 'GZZGrEW9aYXzbxrdphXuq04ng6E3'}} 
        updateFriends={mockUpdateFriends}
      /> )
    expect(wrapper).toMatchSnapshot();
  })

  //addFriendsToDB
  it('addFriendsToDB should set state with an error if an error is caught', async() => {
    const wrapper = await shallow(
      <AddFriends 
        user={{uid: 'GZZGrEW9aYXzbxrdphXuq04ng6E3'}} 
        updateFriends={mockUpdateFriends}
      /> )

    db.doWriteFriendsData = jest.fn().mockImplementation(() => {
      throw new Error('unable to fetch users')
    })

    db.getFriends = () => {}

    await wrapper.instance().addFriendsToDB();

    expect(wrapper.state().error).toEqual('unable to fetch users')
  })

  it('addFriendsToDB should call updateFriends with friends', async() => {
    const wrapper = await shallow(
      <AddFriends 
        user={{uid: 'GZZGrEW9aYXzbxrdphXuq04ng6E3'}} 
        updateFriends={mockUpdateFriends}
      /> )

    db.doWriteFriendsData = jest.fn();
    db.getFriends = () => mockData.mockAllUsers;
    await wrapper.instance().addFriendsToDB('1');
    expect(mockUpdateFriends).toHaveBeenCalledWith(mockData.mockAllUsers);
  })
})

describe("mapStateToProps", () => {
  it('should take in state and return a user object', () => {
    expect(mapStateToProps(mockData.mockMSTPUserState)).toEqual(mockData.mockMSTPUser)
  })
})

describe("mapDispatchToProps", () => {
  it('should call dispatch when updateFriends is called', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.updateFriends();
    expect(mockDispatch).toHaveBeenCalled();    
  })
})