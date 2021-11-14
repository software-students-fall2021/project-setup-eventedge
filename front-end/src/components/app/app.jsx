import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {Navigation} from '../navigation';
import {Register} from '../register';
import {LandingPage} from '../landing-page';
import {Login} from '../login';
import {Chat} from '../chat';
import {Chats} from '../chats';
import {Footer} from '../footer';
import {NotFound} from '../not-found';
import styles from './app.module.css';
import {ModalContextProvider} from '../../lib/context/modal';
import {AuthContextProvider} from '../../lib/context/auth';
import {ModalRegistry} from '../modal-registry';
import {ModalsTest} from '../modals-test';
import {Events} from '../events';
import {PrivateComponent} from './private-component';
import {PublicOnlyComponent} from './public-only-component';

export const App = () => (
  <AuthContextProvider>
    <ModalContextProvider>
      <Router>
        <ModalRegistry />
        <Navigation />
        <div className={styles.mainContainer}>
          <Switch>
            <Route path="/" exact>
              <PublicOnlyComponent>
                <LandingPage />
              </PublicOnlyComponent>
            </Route>
            <Route path="/register" exact>
              <PublicOnlyComponent>
                <Register />
              </PublicOnlyComponent>
            </Route>
            <Route path="/events" exact>
              <PrivateComponent>
                <Events />
              </PrivateComponent>
            </Route>
            <Route path="/login" exact>
              <PublicOnlyComponent>
                <Login />
              </PublicOnlyComponent>
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
  </AuthContextProvider>
);
