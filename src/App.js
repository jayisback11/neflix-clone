import React from 'react';
import './App.css';
import Homescreen from './components/homescreen/Homescreen'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './components/login/LoginScreen'

function App() {
  const user = null

  return (
    <div className="app">
    <Router>
      {!user ? (
        <Login />
      ): (
        <Switch>
          <Route>
            <Homescreen/>
          </Route>
      </Switch>
      )}
    </Router>
    </div>
  );
}

export default App;
