import React from 'react';

export const SignIn = ({ handleChange, email, passwordOne }) => {
  return (
    <div>
      <input 
        type="email"
        className="login-input"
        placeholder="email"
        name="email"
        onChange={ (event) => handleChange(event) }
        value={ email }
      />
      <input 
        type="password"
        className="login-input"
        placeholder="Password"
        name="passwordOne"
        onChange={ (event) => handleChange(event) }
        value={ passwordOne }
      />
    </div>
  )
}