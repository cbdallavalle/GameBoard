/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { auth } from '../../firebase';
import { Header } from './Header';

describe("Header", () => {
  const wrapper = shallow( <Header /> )
  auth.doSignOut = jest.fn()

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('checkSignOut should call auth.doSignOut on successful sign out', () => {
    wrapper.find('button').simulate('click');
    expect(auth.doSignOut).toHaveBeenCalled()
  })

  it.skip('checkSignOut should catch an error', () => {
    auth.doSignOut = Promise.reject();
    wrapper.find('button').simulate('click');
  })
})