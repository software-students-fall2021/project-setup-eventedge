import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {SlidingMenu} from './sliding-menu/sliding-menu';
import styles from './navigation.module.css';

export const Navigation = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleIsMenuVisible = () => setIsMenuVisible(prev => !prev);

  return <>
    <nav className={styles.navigationStrip}>
      <button onClick={toggleIsMenuVisible}>open menu</button>
      <h1>EventEdge</h1>
      <Link to='/'><a>Login</a></Link>
    </nav>
    {isMenuVisible && <SlidingMenu close={toggleIsMenuVisible} />}
  </>
}
