import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {SlidingMenu} from './sliding-menu';
import styles from './navigation.module.css';
import {useAuthContext} from '../../lib/context/auth';

export const Navigation = () => {
  const {isUserLoggedIn, logout} = useAuthContext();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const setIsMenuVisibleToTrue = () => setIsMenuVisible(true);
  const setIsMenuVisibleToFalse = () => setIsMenuVisible(false);

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
          {isUserLoggedIn ? (
            <a className={styles.link} onClick={logout}>
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
