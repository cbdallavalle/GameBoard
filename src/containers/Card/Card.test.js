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

  it('should have a default state of contenteditable to be false, and error to be an empty string', () => {

    expect(wrapper.state()).toEqual({contenteditable: 'false', error: ''})
  })

  it('should setState so that contenteditable is true if the type is games', async() => {
    const wrapper = await shallow(
      <Card 
        user={{}}
        key={ 0 }
        favorite={ {} }
        friendName={ 'friend' }
        type={ 'games' }
        updateFavorites={mockUpdateFavorites}
      />
    )

    expect(wrapper.state()).toEqual({contenteditable: 'true', error: ''})
  })

  //friendsName
  it('friendsName should match the snapshot when a friends name is provided', () => {

    expect(wrapper).toMatchSnapshot();
  })

  it.skip('handleBlur should set state to have an error if error is caught', async() => {

    window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
      status: 500,
      error: new Error('unable to load friends')
    }))

    const mockCardEvent = {target: {innerHTML: 'blahh'}}

    await wrapper.instance().handleBlur(mockCardEvent);
    expect(wrapper.state().error).toEqual('error')
  })

  it('handleBlur should call doWriteReviewData', () => {
    db.doWriteReviewData = jest.fn();
    const mockCardEvent = {target: {innerHTML: 'blahh'}}

    wrapper.instance().handleBlur(mockCardEvent);
    expect(db.doWriteReviewData).toHaveBeenCalled();
  })

  it('handleDelete should set state with an error if an error is caught', async() => {

    await wrapper.instance().handleDelete();
    expect(wrapper.state().error).toEqual('unable to delete')
  })

  it('handleDelete should call two db functions and updateFavorites', async() => {
    db.doDeleteFavoriteData = jest.fn();
    db.getFavorites = () => mockData.mockFavorites
    
    await wrapper.instance().handleDelete();
    expect(mockUpdateFavorites).toHaveBeenCalledWith(mockData.mockFavorites)
  })

  it('handleAdd should call set state with an error if error is caught', async() => {
    await wrapper.instance().handleAdd();
    expect(wrapper.state().error).toEqual('unable to add favorite data')
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