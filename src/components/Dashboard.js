import React, { useState } from 'react';
import firebase from 'firebase';

import { getDataStore } from '../models/DataStore';
import './Dashboard.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect, 
  useHistory
} from "react-router-dom";

export function Dashboard({user, setUser}) {

  const dataStore = getDataStore();

  let history = useHistory();

  if (!user) {
    return (
      <Redirect to="/"/>
    );
  }

  return (
    <Router>
      <div className='dashboard-page-container'>
        <div className='nav-left'>
          <nav>
            <p>
              <Link to="/dashboard/main">Main</Link>
            </p>
            <p>
              <Link to="/dashboard/about">About</Link>
            </p>
            <p onClick={()=>{
              firebase.auth().signOut();
              setUser(undefined);
              history.push('/');
            }}>
              Log out
            </p>
          </nav>
        </div>
        <div className='body-main'>
          <Switch>
            <Route path="/dashboard/main">
              <Main />
            </Route>
            <Route path="/dashboard/about">
              <About />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Main() {
  return (
    <div className='body-main'>
      <h2>Main</h2>
    </div>
  );
}

function About() {
  const [count, setCount] = useState(0);

  return (
    <div className='body-main'>
      <h2>About</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count - 1)}>
        -
      </button>
      <button onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}




