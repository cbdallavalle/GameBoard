import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const user = {uid: authUser.uid};
    this.props.loginUser(user);
    this.updateFriends(user.uid);
    this.updateFavorites(user.uid);
  }

  updateFriends = async(userId) => {
    const friends = await db.getFriends(userId);
    friends && this.props.updateFriends(friends);
  }

  updateFavorites = async(userId) => {
    const favorites = await db.getFavorites(userId);
    favorites && this.props.updateFavorites(favorites);
  }
  
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

App.propTypes = {
  loginUser: PropTypes.func.isRequired,
  updateFavorites: PropTypes.func.isRequired,
  updateFriends: PropTypes.func.isRequired
};

export const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
  updateFavorites: favorites => dispatch(updateFavorites(favorites)),
  updateFriends: friends => dispatch(updateFriends(friends))
})

export default withRouter(connect(null, mapDispatchToProps)(App));