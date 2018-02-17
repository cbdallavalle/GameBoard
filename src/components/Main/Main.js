import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Search from '../Search/Search';

export const Main = (props) => {
  return (
    <main>
      <Switch>
        <Route
          exact path="/"
          render={() => (!props.authUser ? <Redirect to="/login" /> : <Redirect to="/dashboard" />)}
        />
        <Route 
          path="/dashboard" 
          render={() => (!props.authUser ? <Redirect to="/login" /> : <Dashboard />)}
        />
        <Route 
          path="/login" 
          render={() => (!props.authUser ? <Login /> : <Redirect to="/dashboard" />)} />
        <Route path="/search" component={Search} />
      </Switch>
    </main>
  )
}

// <Route
//   path="/login"
//   render={() => (props.user.name ? <Redirect to="/" /> : <Login />)}
// />