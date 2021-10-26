import React from 'react';
import styles from './events.module.css';

export const Events = () => {
  return (
    <React.Fragment>
      <button className={styles.pendingButton}>Pending Events</button>

      <div className={styles.container}>
        <div className={styles.box}>
          <p>Name: Loreeem Ipsum</p>
          <p>Date/Time: 2000/01/01</p>
        </div>

        <div className={styles.container}>
          <div className={styles.box}>
            <p>Name: Lorem Ipsum</p>
            <p>Date/Time: 2000/01/01</p>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.box}>
            <p>Name: Lorem Ipsum</p>
            <p>Date/Time: 2001/01/01</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
