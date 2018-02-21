import React from 'react';
import ReactDOM from 'react-dom';
import { Card } from './Card';
import { shallow } from 'enzyme';

describe("Card", () => {
  it("should match the snapshot", () => {
    const wrapper = shallow(
      <Card 
        user={{}}
        key={ 0 }
        favorite={ {} }
        friendName={ "friend" }
        type={ "games" }
      />
    )
    expect(wrapper).toMatchSnapshot();
  })
})