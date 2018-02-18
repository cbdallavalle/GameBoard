import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from './SignIn';

describe("SignIn", () => {
  const mockHandleChange = jest.fn();

  it('should match the snapshot', () => {
    const wrapper = shallow(
      <SignIn 
        handleChange={mockHandleChange}
        email={'email'}
        passwordOne={'password'}
      />
    )

    expect(wrapper).toMatchSnapshot();
  })
})