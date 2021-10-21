import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Navigation} from '../navigation';
import './app.css';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <h1>Home</h1>
          </Route>
          <Route path="/other" exact>
            <h1>Other</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
