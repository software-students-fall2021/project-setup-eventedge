import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {SlidingMenu} from './sliding-menu';
import styles from './navigation.module.css';

export const Navigation = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleIsMenuVisible = () => setIsMenuVisible((prev) => !prev);

  return (
    <>
      <nav className={styles.navigationStrip}>
        <button className={styles.burgerButton} onClick={toggleIsMenuVisible}>
          ☰
        </button>
        <h1>EventEdge</h1>
        <Link to="/login">
          <a>Login</a>
        </Link>
      </nav>
      {isMenuVisible && <SlidingMenu close={toggleIsMenuVisible} />}
    </>
  );
};
