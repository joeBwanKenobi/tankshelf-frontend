import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { Layout } from './layouts/Layout';
import { TanksGrid } from './components/views/TanksGridView';
import { TankView } from './components/views/TankView';
import SignUp from './components/views/SignUp';
import classes from '*.module.css';

function App() {
  return (
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" children={ <TanksGrid title="Tanks" />} />
            <Route exact path="/tank/:tankId" children={<TankView />} />
            <Route exact path="/signup" children={ <SignUp /> } />
          </Switch>
        </Router>
      </Layout>
  );
}

export default App;
