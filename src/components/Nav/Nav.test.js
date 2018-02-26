/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from './Nav';

describe("Nav", () => {
  const mockHandleClick = jest.fn();

  it('should match the snapshot', () => {
    const wrapper = shallow(<Nav handleClick={mockHandleClick} />);
    expect(wrapper).toMatchSnapshot();
  })
})