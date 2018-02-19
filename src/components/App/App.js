import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Main from '../Main/Main';
import { auth, db } from '../../firebase';
import { loginUser, updateFavorites, updateFriends } from '../../actions';
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
        ? this.loginUser(authUser)
        : this.props.loginUser(null)
    });
  }

  loginUser = async(authUser) => {
    this.props.loginUser(authUser);
    const favorites = await db.getFavorites(authUser.uid);
    const friends = await db.getFriends(authUser.uid)
    if(favorites) {
      this.props.updateFavorites(favorites)
    }
    if(friends) {
      this.props.updateFriends(friends)
    }
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
  loginUser: user => dispatch(loginUser(user)),
  updateFavorites: favorites => dispatch(updateFavorites(favorites)),
  updateFriends: friends => dispatch(updateFriends(friends))
})

export default withRouter(connect(null, mapDispatchToProps)(App));
