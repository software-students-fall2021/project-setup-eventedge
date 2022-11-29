import React, {useState} from 'react';
import {Button} from '../button';
import styles from './send-message.module.css';
import {getClockTime} from '../../lib/utils/get-clock-time';
import {useAuthContext} from '../../lib/context/auth';

export const SendMessage = ({socket, chatId, dismissModal}) => {
  const {loggedInUsername} = useAuthContext();
  const [msg, setMsg] = useState('');

  const changeMsgHandler = (event) => {
    setMsg(event.target.value);
  };

  const sendMsgHandler = () => {
    dismissModal();
    const msgObj = {
      username: loggedInUsername,
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
