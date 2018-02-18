import React from 'react';

export const SignUp = (props) => {
  const { handleChange, email, passwordOne, name, passwordTwo } = props;
  return (
    <div>
      <input 
        type="text"
        className="login-input"
        placeholder="Name"
        name="name"
        value={ name }
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