import React, { Component } from 'react';
import die from '../../assets/die.gif';
import { auth } from '../../firebase';
import { Nav } from '../Nav/Nav';

import './Header.css';

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      error: ''
    };
  }

  checkSignOut = () => {
    try {
      auth.doSignOut();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <header>  
        <div>
          <img src={die} />
          <h4>GameBoard</h4>
        </div>
        <button type="button" onClick={this.checkSignOut}>
          Sign out
        </button>
        <p>{ this.state.error }</p>
      </header>
    );
  }
}