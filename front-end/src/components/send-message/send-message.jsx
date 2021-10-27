import React from 'react';
import {useModalContext} from '../../lib/context/modal';
import styles from './send-message.module.css';

export const SendMessage = () => {
  const {hideModal} = useModalContext();

  return (
    <>
      <button
        onClick={() => hideModal('sendMessage')}
        className={styles.sendMessageButton}
      >
        Send message
      </button>
      <textarea
        className={styles.messageTextArea}
        placeholder="Your message..."
      />
    </>
  );
};
