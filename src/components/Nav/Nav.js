import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export const Nav = () => {
  return (
    <nav>
      <h1>BG</h1>
      <NavLink to='/'>Dashboard</NavLink>
    </nav>
  )
}