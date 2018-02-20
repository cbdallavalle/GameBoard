import React from 'react';
// import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import './Header.css';

export const Header = () => {

  const checkSignOut = () => {
    try {
      auth.doSignOut();
    } catch(error) {
      return error
      console.log(error)
    }
  }

  return (
    <header>
      <h4>GameBoard</h4>
      <button type="button" onClick={checkSignOut}>
        Sign out
      </button>
    </header>
  )
}