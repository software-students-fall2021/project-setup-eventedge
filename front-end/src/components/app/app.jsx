import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {Navigation} from '../navigation';
import {Register} from '../register';
import {Login} from '../login';
import {Chat} from '../chat';
import {Chats} from '../chats';
import {Footer} from '../footer';
import {NotFound} from '../not-found';
import styles from './app.module.css';
import {ModalContextProvider} from '../../lib/context/modal';
import {ModalRegistry} from '../modal-registry';
import {ModalsTest} from '../modals-test';
import {Events} from '../events';
import {CreateEvent} from '../events';
import {authService} from '../../lib/services/auth-service';
import {PrivateComponent} from './private-component';

export const App = () => (
  <ModalContextProvider>
    <Router>
      <ModalRegistry />
      <Navigation />
      <div className={styles.mainContainer}>
        <Switch>
          <Route path="/" exact>
            {
              authService().isUserLoggedIn() ? (
                <Redirect to="/chats" />
              ) : (
                <h1>Welcome Page</h1>
              ) //Mohammed, replace this line with your Landing Page component.
            }
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/events" exact>
            <PrivateComponent>
              <Events />
            </PrivateComponent>
          </Route>
          <Route path="/createEvent" exact>
            <CreateEvent />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/modals-test" exact>
            <ModalsTest />
          </Route>
          <Route path="/chat/:chatId" exact>
            <PrivateComponent>
              <Chat />
            </PrivateComponent>
          </Route>
          <Route path="/chats" exact>
            <PrivateComponent>
              <Chats />
            </PrivateComponent>
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
