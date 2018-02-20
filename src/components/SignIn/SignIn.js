import React from 'react';
import './SignIn.css';

export const SignIn = ({ handleChange, email, passwordOne }) => {
  return (
    <div className="SignIn">
      <input 
        type="email"
        placeholder="email"
        name="email"
        onChange={ (event) => handleChange(event) }
        value={ email }
      />
      <input 
        type="password"
        placeholder="Password"
        name="passwordOne"
        onChange={ (event) => handleChange(event) }
        value={ passwordOne }
      />
    </div>
  )
}