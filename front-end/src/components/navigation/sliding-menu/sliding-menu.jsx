import React from 'react';
import styles from './sliding-menu.module.css';

export const SlidingMenu = React.memo(({close}) => (
  <div className={styles.slidingMenu}>
    yoo <button onClick={close}>close</button>
  </div>
));
