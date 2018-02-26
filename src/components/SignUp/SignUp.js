import React from 'react';
import PropTypes from 'prop-types';
import './SignUp.css';

export const SignUp = (props) => {
  const { 
    handleChange, 
    email, 
    passwordOne, 
    firstName, 
    lastName, 
    passwordTwo 
  } = props;

  return (
    <div className="SignUp">
      <input 
        type="text"
        placeholder="first name"
        name="firstName"
        value={ firstName }
        onChange={ (event) => handleChange(event) }
      />      
      <input 
        type="text"
        placeholder="last name"
        name="lastName"
        value={ lastName }
        onChange={ (event) => handleChange(event) }
      />
      <input 
        type="email"
        placeholder="email"
        name="email"
        onChange={ (event) => handleChange(event) }
        value={ email }
      />
      <input 
        type="password"
        placeholder="password"
        name="passwordOne"
        onChange={ (event) => handleChange(event) }
        value={ passwordOne }
      />
      <input 
        type="password"
        placeholder="retype password"
        name="passwordTwo"
        onChange={ (event) => handleChange(event) }
        value={ passwordTwo }
      />
    </div>
  );
};

SignUp.propTypes = {
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  passwordOne: PropTypes.string.isRequired,
  passwordTwo: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
};