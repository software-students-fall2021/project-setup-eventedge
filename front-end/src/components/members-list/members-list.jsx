import React from 'react';
import {useChatService} from '../../lib/services/chat-service';
import styles from './members-list.module.css';

export const MembersList = ({id}) => {
  const {isLoading, data} = useChatService.useChatMembers(id);

  const mapUsers = data?.map(({id, username}) => <li key={id}>{username}</li>);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.membersList}>{mapUsers}</ul>
      )}
      <button className={styles.leaveChatButton}>Leave chat</button>
    </>
  );
};
