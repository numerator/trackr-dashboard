import React, { useState } from 'react';

import './App.css';
import { Dashboard } from './Dashboard';
import { Login } from './Login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

export default function App() {

  const [token, setToken] = useState(false);
  let history = useHistory();
  console.log(history);

  if (!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <Dashboard setToken={setToken}/>
  );
}



