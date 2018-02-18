import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Main from '../Main/Main';
import { auth } from '../../firebase';
import { loginUser } from '../../actions';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }

  componentDidMount = async () => {
    await auth.onAuthStateChanged(authUser => {
      authUser
        ? this.props.loginUser(authUser)
        : this.props.loginUser(null)
    });
  }
  
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user))
})

export default withRouter(connect(null, mapDispatchToProps)(App));
