import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; 
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Search from '../Search/Search';
import { AddFriends } from '../AddFriends/AddFriends';
import { connect } from 'react-redux';

        // <Route path="/search" component={Search} />
        // <Route path="/add-friends" component={AddFriends} />

export const Main = (props) => {
  return (
    <main>
      <Switch>
        <Route
          exact path="/"
          render={() => (!props.user ? <Redirect to="/login" /> : <Redirect to="/dashboard" />)}
        />
        <Route 
          path="/dashboard" 
          render={() => (!props.user ? <Redirect to="/login" /> : <Dashboard />)}
        />
        <Route 
          path="/login" 
          render={() => (!props.user ? <Login /> : <Redirect to="/dashboard" />)} />

      </Switch>
    </main>
  )
}

export const mapStateToProps = state => ({
  user: state.user
})

export default withRouter(connect(mapStateToProps, null)(Main));