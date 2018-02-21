import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from './SignUp';

describe("SignUp", () => {
  const mockHandleChange = jest.fn();
  const props = {email: 'email', passwordOne: 'password', passwordTwo: 'password', firstName: 'wren', lastName: 'little' }

  it('should match the snapshot', () => {
    const wrapper = shallow(
      <SignUp 
        handleChange={mockHandleChange}
        {...props}
      />
    )

    expect(wrapper).toMatchSnapshot();
  })
})