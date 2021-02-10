import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { Layout } from './layouts/Layout';
import { Tanks } from './components/views/TanksGridView';
import { TankView } from './components/views/TankView';
import classes from '*.module.css';

function App() {
  return (
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" children={ <Tanks title="Tanks" />} />
            <Route exact path="/tank/:tank" children={<TankView />} />
          </Switch>
        </Router>
      </Layout>
  );
}

export default App;
