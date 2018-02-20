import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export const Nav = () => {
  return (
    <nav>
      <button type="button">
        <i className="fas fa-user"></i> Your Games
      </button>
      <button type="button">
        <i className="fas fa-users"></i> Your friend's games
      </button>
      <NavLink to='/dashboard/search-games'>
        <button id="search-btn">
          Search for games 
        </button>
      </NavLink>
      <NavLink to ='/add-friends'>
        <button id="search-btn">
          Search for friends
        </button>
      </NavLink>
    </nav>
  )
}