import React, {useEffect, useState} from 'react';
import styles from './chat.module.css';
import {useParams} from 'react-router-dom';
import {useModalContext} from '../../lib/context/modal';
import {Link} from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import {API_BASE_URL} from '../../lib/constants';
import {useAuthContext} from '../../lib/context/auth';

export const Chat = () => {
  const {loggedInUsername} = useAuthContext();
  const socket = socketIOClient(API_BASE_URL, {
    transport: ['websocket', 'polling', 'flashsocket'],
  });

  const {chatId} = useParams();
  const {showModal} = useModalContext();

  const showMembersModal = () => showModal('membersList', {id: chatId});

  const showSendMessageModal = () =>
    showModal('sendMessage', {socket: socket, chatId: chatId});
  const showCreateEventModal = () => showModal('createEvent');

  const [messages, setMessages] = useState([]);

  const messagesHandler = (msgObj) => {
    setMessages((prevArr) => {
      return [...prevArr, msgObj];
    });
  };

  useEffect(() => {
    socket.emit('joinRoom', {username: loggedInUsername, chatId});

    socket.emit('retrieveMsgs', {chatId});

    socket.on('retrieveMsgs', (msgs) => {
      console.log(msgs);
      if (msgs !== null) {
        setMessages(msgs);
      } else {
        setMessages([]);
      }
    });

    socket.on('sendMsg', (msgObj) => {
      messagesHandler(msgObj);
    });
  }, []);

  const mapChatMessages = messages.map(({username, message, date}, index) => (
    <p
      key={index}
      className={
        username === loggedInUsername
          ? `${styles.self} ${styles.text}`
          : styles.text
      }
    >
      <strong>{username}</strong> : {message} ({date}){' '}
    </p>
  ));

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <button onClick={showCreateEventModal}>Create Event</button>
        <Link to="/events">
          <button>Events</button>
        </Link>
        <button onClick={showMembersModal}>Members</button>
      </div>
      <div className={styles.messageList}>{mapChatMessages}</div>
      <div className={styles.chatHeader}>
        <button onClick={showSendMessageModal}>Send message</button>
      </div>
    </div>
  );
};
