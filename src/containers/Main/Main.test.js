import React from 'react';
import { shallow } from 'enzyme';
import { Main } from './Main';

describe( "Main", () => {
  it('should be defined', () => {
    const wrapper = shallow(<Main user={{}} />);
    expect(wrapper).toBeDefined();
  })
})
