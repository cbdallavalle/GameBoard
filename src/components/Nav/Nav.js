import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export const Nav = ({handleClick}) => {
  return (
    <nav>
      <button name='your-games' onClick={(e) => handleClick(e)}>
        <i className="fas fa-user"></i> Your Games
      </button>
      <button name='friends-games' onClick={(e) => handleClick(e)}>
        <i className="fas fa-users"></i> Your friend's games
      </button>
      <button name='search-games' onClick={(e) => handleClick(e)}>
        Search for games 
      </button>
      <button name="search-friends" onClick={(e) => handleClick(e)}>
        Search for friends
      </button>
    </nav>
  )
}