import React, {useState} from 'react';
import {useModalContext} from '../../lib/context/modal';
import {Button} from '../button';
import styles from './send-message.module.css';
import {authService} from '../../lib/services/auth-service';
import {getClockTime} from '../../lib/utils/get-clock-time';

export const SendMessage = ({socket, chatId}) => {
  const {hideModal} = useModalContext();
  const [msg, setMsg] = useState('');

  const username = authService().getUsername();
  const changeMsgHandler = (event) => {
    setMsg(event.target.value);
  };

  const sendMsgHandler = () => {
    hideModal('sendMessage');

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
