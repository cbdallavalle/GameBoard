import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Login from '../Login/Login';
import { Main } from '../Main/Main';
import { firebase, auth } from '../../firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }

  componentDidMount = async () => {
    await auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <div className="App">
        <Main authUser={ this.state.authUser }/>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(App));
