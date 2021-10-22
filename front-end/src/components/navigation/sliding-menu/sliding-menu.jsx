import React from 'react';
import {Link} from 'react-router-dom';
import styles from './sliding-menu.module.css';

const LINKS = [
  {name: 'Home', href: '/'},
  {name: 'Chats', href: '/chats'},
  {name: 'Events', href: '/events'},
];

export const SlidingMenu = React.memo(({onClose}) => {
  const mapLinks = LINKS.map(({name, href}) => (
    <Link key={name} to={href}>
      <a className={styles.link} onClick={onClose}>
        {name}
      </a>
    </Link>
  ));

  return (
    <div className={styles.slidingMenu}>
      <button onClick={onClose} className={styles.closeButton}>
        ✕
      </button>
      {mapLinks}
    </div>
  );
});
