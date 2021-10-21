import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
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

export default App;
