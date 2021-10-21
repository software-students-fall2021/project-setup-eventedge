import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Navigation} from '../navigation';
import {Footer} from '../footer';
import styles from './app.module.css';

export const App = () => (
  <Router>
    <Navigation />
    <div className={styles.mainContainer}>
      <Switch>
        <Route path="/" exact>
          <h1>Home</h1>
        </Route>
        <Route path="/other" exact>
          <h1>Other</h1>
        </Route>
      </Switch>
    </div>
    <Footer />
  </Router>
);
