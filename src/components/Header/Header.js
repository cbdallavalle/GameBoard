import React, { Component } from 'react';
import { auth } from '../../firebase';
import './Header.css';

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      error: ''
    }
  }

  checkSignOut = () => {
    try {
      auth.doSignOut();
    } catch(error) {
      this.setState({ error: error.message })
    }
  }

  render() {
    return (
      <header>
        <div>
          <h4>GameBoard</h4>
          <button type="button" onClick={this.checkSignOut}>
            Sign out
          </button>
        </div>
        <p>{ this.state.error }</p>
      </header>
    )
  }
}