import React from 'react';
import styles from './added-users-list.module.css';

export const AddedUsersList = ({usersList}) => {
  const mapSelectedUsers = usersList.map(
    ({username}, index) =>
      `${username}${index !== usersList.length - 1 ? ', ' : ''}`
  );

  return (
    <div className={styles.usersListBox}>
      {usersList.length === 0 ? (
        'You have not selected any users'
      ) : (
        <>
          <strong>Selected users: </strong>
          {mapSelectedUsers}
        </>
      )}
    </div>
  );
};
