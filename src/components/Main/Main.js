import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Search from '../Search/Search';

export const Main = () => {
  
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/search" component={Search} />
      </Switch>
    </main>
  )
}