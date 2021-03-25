import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

// adapted from starter code at https://reactrouter.com/web/example/auth-workflow

export default function App() {

  let [user, setUser] = useState();

  return (
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <Login setUser={setUser}/>
            </Route>
            <Route path="/dashboard">
              <Dashboard setUser={setUser} user={user}/>
            </Route>
            <Route path="/">
              <Redirect to="/login"/>
            </Route>
          </Switch>
        </div>
      </Router>
    
  );
}

