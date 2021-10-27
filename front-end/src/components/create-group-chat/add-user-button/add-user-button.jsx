import React from 'react';
import styles from './add-user-button.module.css';

export const AddUserButton = ({isUserSelected, addUser, removeUser}) =>
  isUserSelected ? (
    <button
      onClick={removeUser}
      className={`${styles.button} ${styles.remove}`}
    >
      Remove user
    </button>
  ) : (
    <button onClick={addUser} className={styles.button}>
      Add user
    </button>
  );
