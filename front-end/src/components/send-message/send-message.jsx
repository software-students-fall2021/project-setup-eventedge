import React from 'react';
import {useModalContext} from '../../lib/context/modal';
import {Button} from '../button';
import styles from './send-message.module.css';

export const SendMessage = () => {
  const {hideModal} = useModalContext();

  return (
    <>
      <Button onClick={() => hideModal('sendMessage')}>Send message</Button>
      <textarea
        className={styles.messageTextArea}
        placeholder="Your message..."
      />
    </>
  );
};
