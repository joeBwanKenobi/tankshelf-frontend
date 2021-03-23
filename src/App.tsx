import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import { Layout } from './layouts/Layout';
import { TanksGrid } from './components/views/TanksGridView';
import { TankView } from './components/views/TankView';
import { ProfileView } from './components/views/ProfileView';
import SignUp from './components/views/SignUp';
import Login from './components/views/Login';
import classes from '*.module.css';
import Home from './components/views/Home';
import UserProvider from './components/contexts/user/UserProvider';
import AuthContext from './components/contexts/auth/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import * as Utils from './components/utils/utils';
import CreateTankView from './components/views/CreateTankView';
import { Create } from '@material-ui/icons';


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
      console.log(res)
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
            <Route exact path="/tank/:tankId" children={<TankView />} />
            <Route exact path="/signup" children={<SignUp />} />
            <Route exact path="/login" children={<Login />} />
            <Route exact path="/user/profile" children={<ProfileView />} />
            <ProtectedRoute path="/tanks/create" isLoggedIn={loggedIn} >
              <CreateTankView />
            </ProtectedRoute>
            <ProtectedRoute path="/user/profile" isLoggedIn={loggedIn} >
              <CreateTankView />
            </ProtectedRoute>
          </Layout>
        </AuthContext.Provider>
        </UserProvider>
      </Switch>
    </Router>

  );
}

export default App;
