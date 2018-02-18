import React from 'react';

export const SignUp = (props) => {
  const { handleChange, email, passwordOne, firstName, lastName, passwordTwo } = props;
  return (
    <div>
      <input 
        type="text"
        className="login-input"
        placeholder="first name"
        name="firstName"
        value={ firstName }
        onChange={ (event) => handleChange(event) }
      />      
      <input 
        type="text"
        className="login-input"
        placeholder="last name"
        name="lastName"
        value={ lastName }
        onChange={ (event) => handleChange(event) }
      />
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
      <input 
        type="password"
        className="login-input"
        placeholder="Retype password"
        name="passwordTwo"
        onChange={ (event) => handleChange(event) }
        value={ passwordTwo }
      />
    </div>
  )
}