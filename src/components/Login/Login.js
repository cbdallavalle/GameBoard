import React, { Component } from 'react';
import dice from '../../assets/dice.gif';
import { auth, db } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import './Login.css'

const initialState = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  displayCreate: 'login',
}

export class Login extends Component {
  constructor() {
    super();
    this.state = {  ...initialState }
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  determineDisplay = () => {
    return this.state.displayCreate === 'signup' ?
    <div>
      <SignUp 
        handleChange={ this.handleChange }
        name={ this.state.name }
        email={ this.state.email }
        passwordOne={ this.state.passwordOne }
        passwordTwo={ this.state.passwordTwo }
      />
      <p 
        id="toggle-account"
        onClick={ this.toggleDisplay }
      >
        Already have an account? Log in!      
        <i className="fas fa-mouse-pointer" id="pointer"></i>
      </p>
    </div>
    :
    <div>
      <SignIn 
        handleChange={ this.handleChange }
        email={ this.state.email }
        passwordOne={ this.state.passwordOne }
      />
      <p 
        id="toggle-account"
        onClick={ this.toggleDisplay }
      >
        Don't have an account? Create one! 
        <i className="fas fa-mouse-pointer" id="pointer"></i>
      </p>
    </div>
  }

  toggleDisplay = () => {
    const displayCreate = this.state.displayCreate === 'login' ? 'signup' : 'login';
    this.setState({ displayCreate, name: '' })
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      email,
      passwordOne,
    } = this.state;
    this.state.name ? this.signUp(email, passwordOne) : this.logIn(email, passwordOne);
  }

  signUp = async (email, passwordOne) => {
    const { history } = this.props;

    try {
      const user = await auth.doCreateUserWithEmailAndPassword(email, passwordOne);
      await db.doCreateUser(user.uid, this.state.name, email)
      this.setState({ ...initialState })
      history.push('/');        
    } catch(error) {
      this.setState({ error: error.message })
    }
  }

  logIn = async (email, password) => {
    const { history } = this.props;

    try {
      await auth.doSignInWithEmailAndPassword(email, password);
      this.setState({ ...initialState })
      history.push('/');
    } catch(error) {
      this.setState({ error: error.message })
    }
  }

  determineInvalid = () => {
    if(this.state.displayCreate === 'login') {
      return (this.state.email === '' || this.state.passwordOne === '');
    } else {
      return (
        this.state.passwordOne !== this.state.passwordTwo ||
        this.state.passwordOne === '' ||
        this.state.email === '' ||
        this.state.name === ''
      )
    }
  }

  render() {
    return (
      <form action="submit" onSubmit={this.handleSubmit}>
        <img src={ dice } alt="dice-logo" id="dice-img"/>
        <h1>Game Board</h1>
        { this.determineDisplay() }
        <button 
          disabled={this.determineInvalid()} 
          className="LogIn" 
          id="submit-btn"
        >
          Log In!
        </button>
        { this.state.error && <p>{this.state.error}</p> }
      </form>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default withRouter(connect(mapStateToProps, null)(Login));