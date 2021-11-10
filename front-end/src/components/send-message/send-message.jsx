import React, {useState} from 'react';
import {Button} from '../button';
import styles from './send-message.module.css';
import {authService} from '../../lib/services/auth-service';
import {getClockTime} from '../../lib/utils/get-clock-time';

export const SendMessage = ({socket, chatId, dismissModal}) => {
  const [msg, setMsg] = useState('');

  const username = authService().getUsername();
  const changeMsgHandler = (event) => {
    setMsg(event.target.value);
  };

  const sendMsgHandler = () => {
    dismissModal();
    const msgObj = {
      username: username,
      message: msg,
      date: getClockTime(),
    };
    socket.emit('sendMsg', {msgObj, chatId});
  };
  return (
    <>
      <Button onClick={sendMsgHandler}>Send message</Button>
      <textarea
        className={styles.messageTextArea}
        placeholder="Your message..."
        onChange={changeMsgHandler}
      />
    </>
  );
};
