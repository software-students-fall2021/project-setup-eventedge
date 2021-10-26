import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {Navigation} from '../navigation';
import {Register} from '../register';
import {Footer} from '../footer';
import {NotFound} from '../not-found';
import styles from './app.module.css';
import {ModalContextProvider} from '../../lib/context/modal';
import {ModalRegistry} from '../modal-registry';

export const App = () => (
  <ModalContextProvider>
    <Router>
      <ModalRegistry />
      <Navigation />
      <div className={styles.mainContainer}>
        <Switch>
          <Route path="/" exact>
            <h1>Home</h1>
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/other" exact>
            <h1>Other</h1>
          </Route>
          <Route path="/404" exact>
            <NotFound />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </div>
      <Footer />
    </Router>
  </ModalContextProvider>
);
