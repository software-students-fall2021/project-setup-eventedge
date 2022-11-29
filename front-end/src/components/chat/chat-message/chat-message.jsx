import React from 'react';
import styles from './chat-message.module.css';

export const ChatMessage = ({
  isAuthor,
  showUsername,
  message,
  date,
  username,
}) => {
  return (
    <div className={`${isAuthor ? styles.author : ''}`}>
      <div className={styles.chatMessage}>
        <span>{message}</span>
        <div className={styles.date}>{date}</div>
      </div>
      {showUsername && (
        <div className={styles.messageAuthorUsername}>{username}</div>
      )}
    </div>
  );
};
