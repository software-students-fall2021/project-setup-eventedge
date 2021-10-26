import React from 'react';
import {users} from '../../lib/mock-data';
import styles from './members-list.module.css';

export const MembersList = () => {
  const mapUsers = users.map(({id, userName}) => <li key={id}>{userName}</li>);

  return (
    <>
      <ul className={styles.membersList}>{mapUsers}</ul>
      <button className={styles.leaveChatButton}>Leave chat</button>
    </>
  );
};
