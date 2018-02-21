import React from 'react';
import { CardContainer } from './CardContainer';
import { shallow } from 'enzyme';

describe("CardContainer", () => {
  it('should exist', () => {
    const wrapper = shallow(
      <CardContainer 
        favorites={[]}
        type="games"
      />
    );
    expect(wrapper).toBeDefined();
  })
})