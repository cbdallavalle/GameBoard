import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Nav.css';

export const Nav = () => {
  return (
    <nav>
      <NavLink 
        to='/dashboard/your-games'
        activeClassName="selected"
      >
        <button name='your-games'>
          <i className="fas fa-user"></i> Your Games
        </button>
      </NavLink>
      <NavLink 
        to='/dashboard/friends-games'
        activeClassName="selected"
      >
        <button name='friends-games' >
          <i className="fas fa-users"></i> Your friend's games
        </button>
      </NavLink>
      <NavLink 
        to='/dashboard/search-games'
        activeClassName="selected"
      >
        <button name='search-games'>
          Search for games 
        </button>
      </NavLink>
      <NavLink 
        to='/dashboard/search-users'
        activeClassName="selected"
      >
        <button name="search-friends">
          Search for friends
        </button>
      </NavLink>
    </nav>
  )
}