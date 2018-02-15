import React from 'react';
import { Search, mapStateToProps } from './Search';
import { shallow } from 'enzyme';

describe('triggerSearch', () => {

  it('should search for game using api', () => {
    const wrapper = shallow(<Search search={"Settlers of CataN"}/>)
    // expect(wrapper.instance().triggerSearch()).toEqual('settlers%20of%20catan');
  })
})

describe('mapStateToProps', () => {
  it('should map search to props', () => {
    const mapped = mapStateToProps({ search: "Onirim"});

    expect(mapped.search).toEqual("Onirim")
  })
})