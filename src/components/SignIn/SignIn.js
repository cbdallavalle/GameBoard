import React from 'react';
import PropTypes from 'prop-types';
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


SignIn.propTypes = {
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  passwordOne: PropTypes.string.isRequired
};