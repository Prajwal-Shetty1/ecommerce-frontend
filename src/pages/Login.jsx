import React, { useState } from 'react'

const Login = () => {
   const [currentState , setCurrentState] = useState('Sign Up');
   const onSubmithandler = async(event) => {
    event.preventDefault();
   }
  return (
    <>
      <form className="login-form" onSubmit={onSubmithandler}>
          <p className="login-title">{currentState}</p>
          {currentState == 'Login' ? '' : <input type="text" placeholder='Name' required/> }
          <input type="email" placeholder='Email' required/>
          <input type="password" placeholder='Password' required/>
        <div className="login-footer">
          <p>Forgot your password?</p>
          {
            currentState === 'Login' ?
            <p onClick={() => setCurrentState('Sign Up')}>Create Account</p> :
            <p onClick={() => setCurrentState('Login')}>Login Here</p>
          }
        </div>
        <button className="login-btn"> {currentState == 'Login' ? 'Sign In' : 'Sign Up'} </button>
      </form>
    </>
  )
}

export default Login;

