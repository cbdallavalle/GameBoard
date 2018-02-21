import React from 'react';
import { Login } from './Login';
import { shallow } from 'enzyme';
import { auth, db } from '../../firebase';

describe("Login", () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    displayCreate: 'login',
  }

  const erroredSignInState = {
    "displayCreate": "login", 
    "email": "", 
    "error": "signInWithEmailAndPassword failed: First argument \"email\" must be a valid string.", 
    "firstName": "", 
    "lastName": "",
    "passwordOne": "", 
    "passwordTwo": ""
  }

  const erroredSignUpState = {
    "displayCreate": "login", 
    "email": "", 
    "error": "createUserWithEmailAndPassword failed: First argument \"email\" must be a valid string.", 
    "firstName": "", 
    "lastName": "",
    "passwordOne": "", 
    "passwordTwo": ""
  }

  it('should have a default state', () => {
    const wrapper = shallow(<Login user={{}} />)
    expect(wrapper.state()).toEqual(initialState)
  })

  it('should match the snapshot when displayCreate is login', () => {
    const wrapper = shallow(<Login user={{}} />)
    expect(wrapper).toMatchSnapshot();
  })

  it('should match the snapshot when displayCreate is signup', () => {
    const wrapper = shallow(<Login user={{}} />)
    wrapper.setState({ displayCreate: 'signup' })
    expect(wrapper).toMatchSnapshot();
  })

  it('should toggle the display to signup', () => {
    const wrapper = shallow(<Login user={{}} />)
    expect(wrapper.state().displayCreate).toEqual('login');
    wrapper.instance().toggleDisplay();
    expect(wrapper.state().displayCreate).toEqual('signup');
  })

  it('should toggle the display to login', () => {
    const wrapper = shallow(<Login user={{}} />)
    wrapper.setState({ displayCreate: 'signup' })
    expect(wrapper.state().displayCreate).toEqual('signup');
    wrapper.instance().toggleDisplay();
    expect(wrapper.state().displayCreate).toEqual('login');
  })

  it('should call signUp when state has name', async() => {
    const wrapper = shallow(<Login user={{}} />)
    const mockEvent = {preventDefault: () => {}}
    wrapper.instance().signUp = jest.fn();
    await wrapper.setState({ firstName: 'first', email: 'email', passwordOne: 'passwordOne' })
    wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.instance().signUp).toHaveBeenCalledWith('email', 'passwordOne');
  })

  it('should call logIn when state does not have name', async() => {
    const wrapper = shallow(<Login user={{}} />)
    const mockEvent = {preventDefault: () => {}}
    wrapper.instance().logIn = jest.fn();
    await wrapper.setState({ email: 'email', passwordOne: 'passwordOne' })
    wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.instance().logIn).toHaveBeenCalledWith('email', 'passwordOne');
  })

  it('when signUp called it should set state with error message when call fails', () => {
    const wrapper = shallow(<Login user={{}} />);
    wrapper.instance().signUp();
    expect(wrapper.state()).toEqual(erroredSignUpState)
  })

  it('when signUp called it should set state with initial state when succesful', () => {
    auth.doCreateUserWithEmailAndPassword = jest.fn();
    db.doCreateUser = jest.fn();
    const wrapper = shallow(<Login user={{}} />)
    wrapper.instance().signUp({email: 'email'}, {passwordOne: 'passwordOne'});
    expect(wrapper.state()).toEqual(initialState)
  })

  it('when logIn called it should set state with error message when call fails', () => {
    const wrapper = shallow(<Login user={{}} />)
    wrapper.instance().logIn();
    expect(wrapper.state()).toEqual(erroredSignInState)
  })

  it('when logIn should should set state with initial state when successful', async() => {
    auth.doSignInWithEmailAndPassword = jest.fn();
    const wrapper = shallow(<Login user={{}} />)
    wrapper.instance().logIn({email: 'email'}, {passwordOne: 'passwordOne'});
    expect(wrapper.state()).toEqual(initialState)
  })

  it('determineInvalid should return false if state is login and requirements are met', () => {
    const wrapper = shallow(<Login user={{}} />)
    wrapper.setState({ passwordOne: 'pass', email: 'email' })
    expect(wrapper.instance().determineInvalid()).toEqual(false)
  })

  it('determineInvalid should return true if state is login and requirements are met', () => {
    const wrapper = shallow(<Login user={{}} />)
    expect(wrapper.instance().determineInvalid()).toEqual(true)
  })

  it('determineInvalid should return false if state is signup and requirements are met', () => {
    const wrapper = shallow(<Login user={{}} />)
    wrapper.setState({ displayCreate: 'signup', passwordOne: 'pass', passwordTwo: 'pass', email: 'email', firstName: 'name', lastName: 'name' })
    expect(wrapper.instance().determineInvalid()).toEqual(false)

  })

  it('determineInvalid should return true if state is signup and requirements are met', () => {
    const wrapper = shallow(<Login user={{}} />)
    wrapper.setState({ displayCreate: 'signup' })
    expect(wrapper.instance().determineInvalid()).toEqual(true)
  })

})