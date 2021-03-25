import React, { useState } from 'react';

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

  let foo = new Date();
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




