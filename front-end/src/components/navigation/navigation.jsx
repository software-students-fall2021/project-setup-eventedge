import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {SlidingMenu} from './sliding-menu';
import styles from './navigation.module.css';
import {authService} from '../../lib/services/auth-service';

export const Navigation = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const setIsMenuVisibleToTrue = () => setIsMenuVisible(true);
  const setIsMenuVisibleToFalse = () => setIsMenuVisible(false);

  const onLogout = () => {
    authService().logout();
    window.location = '/login';
  };

  return (
    <>
      <nav className={styles.navigationStrip}>
        <button
          className={styles.burgerButton}
          onClick={setIsMenuVisibleToTrue}
        >
          ☰
        </button>
        <h1>EventEdge</h1>
        <Link to="/login">
          {authService().isUserLoggedIn() ? (
            <a className={styles.link} onClick={onLogout}>
              Log Out
            </a>
          ) : (
            <a>Login</a>
          )}
        </Link>
      </nav>
      {isMenuVisible && <SlidingMenu onClose={setIsMenuVisibleToFalse} />}
    </>
  );
};
