/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Main, mapStateToProps } from './Main';
import { mockData } from '../../mockData/mockData';

describe( 'Main', () => {
  it('should be defined', () => {
    const wrapper = shallow(<Main user={{}} />);
    expect(wrapper).toBeDefined();
  })
})

describe('mapStateToProps', () => {
  it('should take in state and return a user object', () => {
    expect(mapStateToProps(mockData.mockMSTPUserState)).toEqual(mockData.mockMSTPUser)
  })
})
