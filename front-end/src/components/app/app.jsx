import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {Navigation} from '../navigation';
import {Footer} from '../footer';
import {NotFound} from '../not-found';
import styles from './app.module.css';

import {Modal} from '../modal';

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
          <Modal title="Something">hello</Modal>
        </Route>
        <Route path="/404" exact>
          <NotFound />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </div>
    <Footer />
  </Router>
);
