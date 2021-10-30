import React from 'react';
import styles from './landing-page.module.css';
import {Link} from 'react-router-dom';

export const LandingPage = () => {
  return (
    <>
      <Link to="/login">
        <button className={styles.button}> Login</button>
      </Link>
      <Link to="/register">
        <button className={styles.button}> Register</button>
      </Link>
    </>
  );
};
