import React, { Component } from 'react';
import dice from '../../assets/dice.gif';
import { loginUser } from '../../actions';
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

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  determineDisplay = () => {
    return this.state.displayCreate ?
    <div className="create-account">
      <p 
        id="toggle-account"
        onClick={ this.toggleDisplay }
      >
        Already have an account? Log in!      
        <i className="fas fa-mouse-pointer" id="pointer"></i>
      </p>
      <input 
        type="text"
        className="login-input"
        placeholder="Name"
        name="name"
        value={ this.state.name }
        onChange={ this.handleChange }
      />

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
    console.log(this.state)
    return (
      <form action="submit">
        <img src={ dice } alt="dice-logo" id="dice-img"/>
        <h1>Game Board</h1>
        { this.determineDisplay() }
        <input 
          type="email"
          className="login-input"
          placeholder="Username"
          name="username"
          onChange={ this.handleChange }
          value={ this.state.username }
        />
        <input 
          type="password"
          className="login-input"
          placeholder="Password"
          name="password"
          onChange={ this.handleChange }
          value={ this.state.password }
        />
        <button className="LogIn">Log In!</button>
      </form>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//   addUser = user => dispatch(loginUser({}))
// })

export default Login;