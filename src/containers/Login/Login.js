import React, { Component } from 'react';
import dice from '../../assets/dice.gif';
import PropTypes from 'prop-types';
import { auth, db } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignIn } from '../../components/SignIn/SignIn';
import { SignUp } from '../../components/SignUp/SignUp';
import './Login.css';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  displayCreate: 'login'
};

export class Login extends Component {
  constructor() {
    super();
    this.state = {  ...initialState };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  //put into router
  determineDisplay = () => {
    return this.state.displayCreate === 'signup' ?
      <div>
        <SignUp 
          handleChange={ this.handleChange }
          firstName={ this.state.firstName }
          lastName={ this.state.lastName }
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
        > Don't have an account? Create one! 
          <i className="fas fa-mouse-pointer" id="pointer"></i>
        </p>
      </div>;
  }

  toggleDisplay = () => {
    const displayCreate = this.state.displayCreate === 'login' 
      ? 'signup' : 'login';
    this.setState({ displayCreate, name: '' });
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      email,
      passwordOne
    } = this.state;
    this.state.firstName 
      ? this.signUp(email, passwordOne) 
      : this.logIn(email, passwordOne);
  }

  signUp = async (email, passwordOne) => {
    const { history } = this.props;

    try {
      const user = await 
        auth.doCreateUserWithEmailAndPassword(
          email, 
          passwordOne
        );
      await db.doCreateUser(
        user.uid, 
        this.state.firstName, 
        this.state.lastName, email
      );
      this.setState({ ...initialState });
      history.push('/');        
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  logIn = async (email, password) => {
    const { history } = this.props;

    try {
      await auth.doSignInWithEmailAndPassword(email, password);
      this.setState({ ...initialState });
      history.push('/');
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  determineInvalid = () => {
    if (this.state.displayCreate === 'login') {
      return (this.state.email === '' || this.state.passwordOne === '');
    } else {
      return (
        this.state.passwordOne !== this.state.passwordTwo ||
        this.state.passwordOne === '' ||
        this.state.email === '' ||
        this.state.fistName === '' ||
        this.state.lastName === ''
      );
    }
  }

  render() {
    return (
      <form action="submit" onSubmit={this.handleSubmit}>
        <img src={ dice } alt="dice-logo" id="dice-img"/>
        <h1>Game Board</h1>
        { this.determineDisplay() }
        <button 
          type="submit"
          disabled={this.determineInvalid()} 
          className="LogIn" 
          id="submit-btn"
        >
          Submit
        </button>
        { this.state.error && <p>{this.state.error}</p> }
      </form>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object
};

export const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps, null)(Login));