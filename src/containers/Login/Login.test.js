/* eslint-disable */
import React from 'react';
import { Login, mapStateToProps } from './Login';
import { shallow } from 'enzyme';
import { auth, db } from '../../firebase';
import { mockData } from '../../mockData/mockData';

describe("Login", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login user={{}} />)
  })

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual(mockData.initialState)
  })

  //handleChange
  it('handleChange should set state with a mock event', () => {
    wrapper.instance().handleChange(mockData.mockLogInEvent)
    expect(wrapper.state().email).toEqual('coda@gmail.com')
  })

  //determineDisplay
  it('determineDisplay should match the snapshot when displayCreate is login', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('determineDisplay should match the snapshot when displayCreate is signup', () => {
    wrapper.setState({ displayCreate: 'signup' })
    expect(wrapper).toMatchSnapshot();
  })

  //toggleDisplay
  it('toggleDisplay should toggle the display to signup', () => {
    expect(wrapper.state().displayCreate).toEqual('login');
    wrapper.instance().toggleDisplay();
    expect(wrapper.state().displayCreate).toEqual('signup');
  })

  it('toggleDisplay should toggle the display to login', () => {
    wrapper.setState({ displayCreate: 'signup' })
    expect(wrapper.state().displayCreate).toEqual('signup');
    wrapper.instance().toggleDisplay();
    expect(wrapper.state().displayCreate).toEqual('login');
  })

  //handleSubmit
  it('handleSubmit should call signUp when state has first name', () => {
    wrapper.instance().signUp = jest.fn();
    wrapper.setState({ email: 'email', passwordOne: 'passwordOne', firstName: 'kubla'})
    wrapper.instance().handleSubmit(mockData.mockLogInEvent);
    expect(wrapper.instance().signUp).toHaveBeenCalledWith('email', 'passwordOne')
  })

  it('handleSubmit should call logIn when state does not have first name', () => {
    wrapper.instance().logIn = jest.fn();
    wrapper.setState({ email: 'email', passwordOne: 'passwordOne' })
    wrapper.instance().handleSubmit(mockData.mockLogInEvent);
    expect(wrapper.instance().logIn).toHaveBeenCalledWith('email', 'passwordOne')
  })

  //signUp
  it('signUp should call signUp when state has name', async() => {
    wrapper.instance().signUp = jest.fn();
    await wrapper.setState({ firstName: 'first', email: 'email', passwordOne: 'passwordOne' })
    wrapper.instance().handleSubmit(mockData.mockLogInEvent);
    expect(wrapper.instance().signUp).toHaveBeenCalledWith('email', 'passwordOne');
  })

  it('when signUp called it should set state with error message when call fails', () => {
    wrapper.instance().signUp();
    expect(wrapper.state().error).toEqual("createUserWithEmailAndPassword failed: First argument \"email\" must be a valid string.")
  })

  it('when signUp called it should set state with initial state when succesful', () => {
    auth.doCreateUserWithEmailAndPassword = jest.fn();
    db.doCreateUser = jest.fn();
    wrapper.instance().signUp({email: 'email'}, {passwordOne: 'passwordOne'});
    expect(wrapper.state()).toEqual(mockData.initialState)
  })

  //login
  it('logIn should call logIn when state does not have name', async() => {
    wrapper.instance().logIn = jest.fn();
    await wrapper.setState({ email: 'email', passwordOne: 'passwordOne' })
    wrapper.instance().handleSubmit(mockData.mockLogInEvent);
    expect(wrapper.instance().logIn).toHaveBeenCalledWith('email', 'passwordOne');
  })

  it('when logIn called it should set state with error message when call fails', () => {
    wrapper.instance().logIn();
    expect(wrapper.state().error).toEqual("signInWithEmailAndPassword failed: First argument \"email\" must be a valid string.")
  })

  it('when logIn should should set state with initial state when successful', async() => {
    auth.doSignInWithEmailAndPassword = jest.fn();
    wrapper.instance().logIn({email: 'email'}, {passwordOne: 'passwordOne'});
    expect(wrapper.state()).toEqual(mockData.initialState)
  })

  //determineInvalid
  it('determineInvalid should return false if state is login and requirements are met', () => {
    wrapper.setState({ passwordOne: 'pass', email: 'email' })
    expect(wrapper.instance().determineInvalid()).toEqual(false)
  })

  it('determineInvalid should return true if state is login and requirements are met', () => {
    expect(wrapper.instance().determineInvalid()).toEqual(true)
  })

  it('determineInvalid should return false if state is signup and requirements are met', () => {
    wrapper.setState({ displayCreate: 'signup', passwordOne: 'pass', passwordTwo: 'pass', email: 'email', firstName: 'name', lastName: 'name' })
    expect(wrapper.instance().determineInvalid()).toEqual(false)

  })

  it('determineInvalid should return true if state is signup and requirements are met', () => {
    wrapper.setState({ displayCreate: 'signup' })
    expect(wrapper.instance().determineInvalid()).toEqual(true)
  })
})

describe("mapStateToProps", () => {
  it('should take in state and return a user object', () => {
    expect(mapStateToProps(mockData.mockMSTPUserState)).toEqual(mockData.mockMSTPUser)
  })
})