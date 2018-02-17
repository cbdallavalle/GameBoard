import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

export const SignOutBtn = () => {

  const checkSignOut = () => {
    try {
      auth.doSignOut();
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <button type="button" onClick={checkSignOut}>
      Sign out
    </button>
  )
}