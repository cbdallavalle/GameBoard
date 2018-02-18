import React from 'react';
import { shallow } from "enzyme";
import { Dashboard } from './Dashboard';

describe('Dashboard', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Dashboard />)
    expect(wrapper).toMatchSnapshot();
  })

  // it('should have a default state of empty strings for gameSearch, friendSearch', () => {
  //   const wrapper = shallow(<Dashboard />)
  //   expect(wrapper.state()).toEqual({ gameSearch: '', friendSearch: ''})
  // })

  // it('should change state when handleChange has been called', () => {
  //   const wrapper = shallow(<Dashboard />)
  //   const mockEvent = { target: {name: "gameSearch", target: "Captain Sonar"}}
  //   wrapper.instance().handleChange(mockEvent)
  // })
})

// describe('mapDispatchToProps', () => {
//   it('should map addSearch to props', () => {
//       const mockDispatch = jest.fn();
//       const mapped = mapDispatchToProps(mockDispatch);

//       mapped.addSearch("Evolution");
//       expect(mockDispatch).toHaveBeenCalled();
//   })
// })
