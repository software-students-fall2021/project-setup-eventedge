import React from 'react';
import styles from './pending.module.css';
export const Pending = () => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.box}>
          <p>Name: Loreeem Ipsum</p>
          <p>Date/Time: 2000/01/01</p>
        </div>

        <button className={styles.acceptButton}>Accept </button>
        <button className={styles.declineButton}>Decline </button>

        <div className={styles.container}>
          <div className={styles.box}>
            <p>Name: Lorem Ipsum</p>
            <p>Date/Time: 2000/01/01</p>
          </div>
        </div>

        <button className={styles.acceptButton}>Accept </button>
        <button className={styles.declineButton}>Decline </button>

        <div className={styles.container}>
          <div className={styles.box}>
            <p>Name: Lorem Ipsum</p>
            <p>Date/Time: 2001/01/01</p>
          </div>
        </div>

        <button className={styles.acceptButton}>Accept </button>
        <button className={styles.declineButton}>Decline </button>
      </div>
    </React.Fragment>
  );
};
