import React, { Component } from 'react';
import dice from '../../assets/dice.gif';
// import { NavLink } from 'react-router-dom';
import './Login.css'

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      password: '',
      displayCreate: false,
    }
  }

  determineDisplay = () => {
    return this.state.displayCreate ?
    <div className="create-account">
      <input 
        type="text"
        className="login-input"
        placeholder="Name"
        name="name"
        value={ this.state.name }
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
    const displayCreate = !this.state.displayCreate;
    this.setState({ displayCreate })
  }

  render() {
    return (
      <form action="submit">
        <img src={ dice } alt="dice-logo" id="dice-img"/>
        <h1>Game Board</h1>
        <input 
          type="email"
          className="login-input"
          placeholder="Email"
          name="username"
          value={ this.state.username }
        />
        <input 
          type="password"
          className="login-input"
          placeholder="Password"
          name="password"
          value={ this.state.password }
        />
        <button className="LogIn">Log In!</button>
        { this.determineDisplay() }
      </form>
    )
  }
}

export default Login;