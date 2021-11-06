import React, {useState} from 'react';
import {useModalContext} from '../../lib/context/modal';
import {Button} from '../button';
import styles from './send-message.module.css';
import {authService} from '../../lib/services/auth-service';

export const SendMessage = ({socket, chatId}) => {
  const {hideModal} = useModalContext();
  const [msg, setMsg] = useState('');

  const username = authService().getUsername();
  const changeMsgHandler = (event) => {
    setMsg(event.target.value);
  };

  const getClockTime = () => {
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let ap = 'AM';
    if (hour > 11) {
      ap = 'PM';
    }
    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    var timeString = hour + ':' + minute + ' ' + ap;
    return (
      today.getMonth() +
      1 +
      '/' +
      today.getDate() +
      '/' +
      today.getFullYear() +
      ' ' +
      timeString
    );
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
