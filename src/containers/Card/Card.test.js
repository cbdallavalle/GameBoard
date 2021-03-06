/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Card, mapStateToProps, mapDispatchToProps } from './Card';
import { shallow } from 'enzyme';
import { db } from '../../firebase';
import { mockData } from '../../mockData/mockData';


describe('Card', () => {
  let wrapper;
  const mockUpdateFavorites = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Card 
        user={{}}
        key={ 0 }
        favorite={ {} }
        friendName={ 'coda' }
        type={ 'friends' }
        updateFavorites={mockUpdateFavorites}
      />
    )
  })

  it('should match the snapshot', () => {
    const wrapper = shallow(
      <Card 
        user={{}}
        key={ 0 }
        favorite={ {} }
        friendName={ 'friend' }
        type={ 'games' }
        updateFavorites={mockUpdateFavorites}
      />
    )
    expect(wrapper).toMatchSnapshot();
  })

  it('should have a default state of error to be an empty string, edit to be false, review to be an empty object', async() => {
      wrapper = await shallow(
        <Card 
          user={{}}
          key={ 0 }
          favorite={ {} }
          friendName={ 'friend' }
          type={ 'games' }
          updateFavorites={mockUpdateFavorites}
        />, {disablelifecyclemethods: true}
      )

    expect(wrapper.state()).toEqual({      
      error: '',
      edit: false,
      review: {}
    })
  })

  //friendsName
  it('friendsName should match the snapshot when a friends name is provided', () => {

    expect(wrapper).toMatchSnapshot();
  })

  it.skip('handleBlur should set state to have an error if error is caught', async() => {
    db.doWriteReviewData = jest.fn().mockImplementation(() => {
      throw new Error('unable to write review data')
    })

    const mockCardEvent = {target: {innerHTML: 'blahh'}}

    await wrapper.instance().handleBlur(mockCardEvent);
    expect(wrapper.state().error).toEqual('unable to write review data')
  })

  it.skip('handleBlur should call doWriteReviewData', () => {
    db.doWriteReviewData = jest.fn();
    const mockCardEvent = {target: {innerHTML: 'blahh'}}

    wrapper.instance().handleBlur(mockCardEvent);
    expect(db.doWriteReviewData).toHaveBeenCalled();
  })

  it.skip('handleDelete should set state with an error if an error is caught', async() => {
    db.doDeleteFavoriteData = jest.fn().mockImplementation(() => {
      throw new Error('unable to delete favorite')
    })

    await wrapper.instance().handleDelete();
    expect(wrapper.state().error).toEqual('unable to delete favorite')
  })

  it.skip('handleDelete should call two db functions and updateFavorites', async() => {
    db.doDeleteFavoriteData = jest.fn();
    db.getFavorites = () => mockData.mockFavorites
    
    await wrapper.instance().handleDelete();
    expect(mockUpdateFavorites).toHaveBeenCalledWith(mockData.mockFavorites)
  })

  it('handleAdd should call set state with an error if error is caught', async() => {
    db.doAddFavoriteData = jest.fn().mockImplementation(() => {
      throw new Error('unable to add favorite')
    })

    await wrapper.instance().handleAdd();
    expect(wrapper.state().error).toEqual('unable to add favorite')
  })

  it('handleAdd should call two db functions and updateFavorites', async() => {
    db.doAddFavoriteData = jest.fn();
    db.getFavorites = () => mockData.mockFavorites

    const mockCardEvent = {target: {innerHTML: 'blahh'}}

    await wrapper.instance().props.updateFavorites.mockClear();
    await wrapper.instance().handleAdd(mockCardEvent);
    expect(mockUpdateFavorites).toHaveBeenCalledWith(mockData.mockFavorites)
  })
})

describe('mapStateToProps', () => {
  it('should take in state and return a user object', () => {
    expect(mapStateToProps(mockData.mockMSTPUserState)).toEqual(mockData.mockMSTPUser)
  })
})

describe('mapDispatchToProps', () => {
  it('should call mockDispatch on updateFavorites', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.updateFavorites();
    expect(mockDispatch).toHaveBeenCalled();
  })
})