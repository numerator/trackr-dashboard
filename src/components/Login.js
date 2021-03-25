
import React, { useState } from 'react';

import './Login.css';

import {
  Link, 
  useHistory
} from "react-router-dom";

export function Login({setUser}) {
  let history = useHistory();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  return (
    <div className='login-page-container'>
      <input className='input-box' 
        type='text'
        value={email} 
        onChange={(e)=>{setEmail(e.target.value)}}/>
      <br/>
      <input className='input-box' 
        type='password'
        value={password} 
        onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={()=>{
        setUser(email);
        history.push("/dashboard");
      }}>
      Login!</button>
    </div>
  );
}