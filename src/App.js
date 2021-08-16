import React, {useEffect} from 'react';
import './App.css';
import Homescreen from './components/homescreen/Homescreen'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { auth, db } from './firebase'
import {useSelector, useDispatch} from 'react-redux'
import Login from './components/login/LoginScreen'
import {login, logout, selectUser} from './features/userSlice'
import Profile from './components/profile/Profile'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          email: authUser.email
        }))
      } else {
        dispatch(logout())
      }
    })

    return unsubscribe
  }, [dispatch])

  return (
    <div className="app">
    <Router>
      {!user ? (
        <Login />
      ): (
        <Switch>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route exact path="/">
            <Homescreen/>
          </Route>
      </Switch>
      )}
    </Router>
    </div>
  );
}

export default App;
