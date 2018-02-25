import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';

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
          render={() => (!props.user ? <Login /> : <Redirect to="/dashboard/your-games" />)} 
        />
      </Switch>
    </main> 
  )
}

Main.propTypes = {
  user: PropTypes.object
};

export const mapStateToProps = state => ({
  user: state.user
})

export default withRouter(connect(mapStateToProps, null)(Main));