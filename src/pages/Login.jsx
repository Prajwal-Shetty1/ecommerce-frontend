import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {


  //Signup page or create account
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [currentState, setCurrentState] = useState('Login');
  const onSubmithandler = async (event) => {
    event.preventDefault();
  }
  //User Login Credentials api connectivity for frontend login,signup page
  const { navigate, backendUrl, token, setToken } = useContext(ShopContext);

  const onCall = async (e) => {
    e.preventDefault();
    try {
      //Signup page or create account
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password });
        //console.log(response.data.token);
        console.log(response.data);
        //The derived token should be stored
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {   
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        
         //console.log("LOGIN RESPONSE:", response.data);
        //console.log("TOKEN:", response.data.token);
        
  if (response.data.success) {
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
  } else {
    toast.error(response.data.message); // ✅ FIX
  }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
useEffect(()=> {
  if(token){
       navigate('/')
  }
},[token])

  return (
    <>
      <form className="login-form" onSubmit={onCall}>
        <p className="login-title">{currentState}</p>
        {currentState == 'Login' ? '' : <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' required />}
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' required />
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' required />
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

