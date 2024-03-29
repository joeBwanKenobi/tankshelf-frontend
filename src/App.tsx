import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import { Layout } from './layouts/Layout';
import { TanksGrid } from './components/pages/TanksGridView';
import { TankSingleView } from './components/pages/TankSingleView';
import { TankEditorView } from './components/pages/TankEditorView';
import { ProfileView } from './components/pages/ProfileView';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import classes from '*.module.css';
import Home from './components/pages/Home';
import UserProvider from './components/contexts/user/UserProvider';
import AuthContext from './components/contexts/auth/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import * as Utils from './utils/utils';
import CreateTankView from './components/pages/createTank/CreateTankView';


require('dotenv').config();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // set router history
  let history = useHistory();

  const login = ()  => {
    setLoggedIn(true);
  }

  const logout = () => {
    Utils.logOut()
    .then(res => {
      console.log('logout(): ', res)
      if (res.status === 200 && res.data === "logged out") {
        setLoggedIn(false);
      }
    });
  }

  useEffect(() => {
    console.log('App useEffect(): ');
    Utils.loggedIn()
    .then(res => {
      console.log(res)
      if (res) {
        console.log(`calling login()`);
        login();
      } else {
        console.log(`calling logout()`);
        logout();
      }
    })
  }, []);

  return (

    <Router>
      <Switch>
        <Redirect exact from="/" to="/tanks" />
        <UserProvider>
        <AuthContext.Provider value={{ isLoggedIn: loggedIn, cookie: null, login: login, logout: logout  }}>
          <Layout>
            <Route exact path="/tanks" children={<TanksGrid title="Tanks" />} />
            <Route exact path="/tank/:tankId" children={<TankSingleView />} />
            <Route exact path="/signup" children={<SignUp />} />
            <Route exact path="/login" children={<Login />} />
            <ProtectedRoute path="/tanks/create" isLoggedIn={loggedIn} >
              <CreateTankView />
            </ProtectedRoute>
            <ProtectedRoute path="/tank/edit/:tankId" isLoggedIn={loggedIn} >
              <TankEditorView />
            </ProtectedRoute>
            <ProtectedRoute path="/user/profile" isLoggedIn={loggedIn} >
              <ProfileView />
            </ProtectedRoute>
          </Layout>
        </AuthContext.Provider>
        </UserProvider>
      </Switch>
    </Router>

  );
}

export default App;
