import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapDispatchToProps } from './App';
import { shallow } from 'enzyme';

describe("App", () => {
  const loginUser = jest.fn();

  it('should match the snapshot', () => {
    const wrapper = shallow(<App loginUser={loginUser}/>)
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should have a default state of authUser of null', () => {
    const wrapper = shallow(<App loginUser={loginUser}/>, { disableLifecycleMethods: true })
    expect(wrapper.state()).toEqual({ authUser: null })
  })

  it('should run loginUser on component did mount', () => {
    const wrapper = shallow(<App loginUser={loginUser}/>)
    expect(loginUser).toHaveBeenCalled();
  })
})

describe("mapDispatchToProps", () => {
  
  it('should call dispatch when loginUser is called', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.loginUser();
    expect(mockDispatch).toHaveBeenCalled();    
  })
})
