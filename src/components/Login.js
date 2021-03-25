
import React, { useState, useEffect } from 'react';
import {
  Link, 
  useHistory
} from "react-router-dom";
import firebase from 'firebase';

import './Login.css';
import { getDataStore } from '../models/DataStore';

export function Login({setUser}) {
  let history = useHistory();

  let [email, setEmail] = useState('');
  let [displayName, setDisplayName] = useState('');
  let [pass1, setPass1] = useState('');
  let [pass2, setPass2] = useState('');
  const dataStore = getDataStore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {      
        console.log('user is signed in', user.email);
        let dName = user.displayName;
        if (!dName && displayName) {
          dName = displayName;
        }
        const currentUser = {
          displayName: dName,
          id: user.uid
        };
        dataStore.setCurrentUser(currentUser);
        setUser(user);
        history.push("/dashboard");
        console.log('currentUser:', currentUser, 'should be at dashboard now');
      } else {
        //props.navigation.navigate('SignIn');
        console.log('user is signed out');
        dataStore.unsetCurrentUser();
        setUser(undefined);
      }
      console.log('resetting all of the state variables now');
      setEmail('');
      setDisplayName('');
      setPass1('');
      setPass2('');
    });
  }, []);

  return (
    <div className='login-page-container'>
      <input className='input-box' 
        type='text'
        value={email} 
        onChange={(e)=>{setEmail(e.target.value)}}/>
      <br/>
      <input className='input-box' 
        type='password'
        value={pass1} 
        onChange={(e)=>{setPass1(e.target.value)}}/>
      <button 
        onClick={()=>{
          firebase.auth().signInWithEmailAndPassword(email, pass1)
            .then((user) => {
              setEmail('');
              setDisplayName('');
              setPass1('');
              setPass2('');
              console.log(email, 'logged in');
            })
            .catch((error) => {
              alert(
                'Can\'t sign in', error.message,
                [{ text: 'OK', style: 'OK'},]
              );              
            });          
      }}>
      Login!</button>
    </div>
  );
}
