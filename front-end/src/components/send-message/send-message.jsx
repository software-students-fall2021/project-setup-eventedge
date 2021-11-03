import React, {useState} from 'react';
import {useModalContext} from '../../lib/context/modal';
import {Button} from '../button';
import styles from './send-message.module.css';
import {authService} from '../../lib/services/auth-service';

export const SendMessage = (props) => {
  const {hideModal} = useModalContext();
  const [msg, setMsg] = useState('');

  const username = authService().getUsername();
  const changeMsgHandler = (event) => {
    setMsg(event.target.value);
    console.log(props.chatId);
  };

  const sendMsgHandler = () => {
    hideModal('sendMessage');
    console.log(msg);
    console.log(props.hi);
    console.log(props.chatId);
    const chatId = props.chatId;
    const msgObj = {
      username: username,
      message: msg,
      date: '4/15/2021',
    };
    props.socket.emit('sendMsg', {msgObj, chatId});
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
