import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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

require('dotenv').config();

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/" children={<Home />} />
        <UserProvider>
          <Layout>
            <Route exact path="/tanks" children={<TanksGrid title="Tanks" />} />
            <Route exact path="/tank/:tankId" children={<TankView />} />
            <Route exact path="/signup" children={<SignUp />} />
            <Route exact path="/user/profile" children={<ProfileView />} />
            <Route exact path="/login" children={<Login />} />
          </Layout>
        </UserProvider>
      </Switch>
    </Router>

  );
}

export default App;
