import React, {useEffect, useState} from 'react';
import styles from './chat.module.css';
import {useParams} from 'react-router-dom';
import {useModalContext} from '../../lib/context/modal';
import {Link} from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import {authService} from '../../lib/services/auth-service';

export const Chat = () => {
  const socket = socketIOClient('http://localhost:8000', {
    transport: ['websocket', 'polling', 'flashsocket'],
  });

  const {chatId} = useParams();
  const {showModal} = useModalContext();

  const showMembersModal = () => showModal('membersList', {id: chatId});

  const showSendMessageModal = () =>
    showModal('sendMessage', {socket: socket, chatId: chatId});
  const showCreateEventModal = () => showModal('createEvent');

  const username = authService().getUsername();

  const [messages, setMessages] = useState([]);

  const messagesHandler = (msgObj) => {
    setMessages((prevArr) => {
      return [...prevArr, msgObj];
    });
  };

  useEffect(() => {
    socket.emit('joinRoom', {username, chatId});

    socket.emit('retrieveMsgs', {chatId});

    socket.on('retrieveMsgs', (msgs) => {
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

  const mapChatMessages = messages.map((obj) =>
    obj.username === username ? (
      <div key={obj.id}>
        <p className={styles.self + ' ' + styles.text}>
          <strong>{obj.username}</strong> : {obj.message} ({obj.date}){' '}
        </p>
      </div>
    ) : (
      <div key={obj.id}>
        <p className={styles.text}>
          <strong>{obj.username}</strong> : {obj.message} ({obj.date}){' '}
        </p>
      </div>
    )
  );

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
