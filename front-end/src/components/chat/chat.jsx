import React, {useEffect, useState, useRef} from 'react';
import styles from './chat.module.css';
import {useParams} from 'react-router-dom';
import {useModalContext} from '../../lib/context/modal';
import {Link} from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import {API_BASE_URL} from '../../lib/constants';
import {useAuthContext} from '../../lib/context/auth';
import {Loader} from '../loader';
import {ChatMessage} from './chat-message';

export const Chat = () => {
  const {loggedInUsername} = useAuthContext();
  const socket = socketIOClient(API_BASE_URL, {
    transport: ['websocket', 'polling'],
  });

  const scrollRef = useRef(null);
  const scrollLastElementIntoView = () => scrollRef.current.scrollIntoView();

  const {chatId} = useParams();
  const {showModal} = useModalContext();

  const showMembersModal = () => showModal('membersList', {id: chatId});

  const showSendMessageModal = () =>
    showModal('sendMessage', {socket: socket, chatId: chatId});
  const showCreateEventModal = () => showModal('createEvent', {chatId: chatId});

  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  const messagesHandler = (msgObj) => {
    setMessages((prevArr) => {
      return [...prevArr, msgObj];
    });
  };

  useEffect(() => {
    if (messages.length !== 0) {
      scrollLastElementIntoView();
    }
  }, [messages]);

  useEffect(() => {
    socket.emit('joinRoom', {username: loggedInUsername, chatId});

    socket.emit('retrieveMsgs', {chatId});

    socket.on('retrieveMsgs', (msgs) => {
      setIsLoadingMessages(false);

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

  const mapChatMessages = messages.map(
    ({username, message, date}, index, data) => (
      <ChatMessage
        key={index}
        username={username}
        isAuthor={username === loggedInUsername}
        message={message}
        date={date}
        showUsername={username !== data[index + 1]?.username}
      />
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
      <div className={styles.messageList}>
        {isLoadingMessages ? (
          <Loader />
        ) : (
          <>
            {mapChatMessages}
            <div ref={scrollRef} />
          </>
        )}
      </div>
      <div className={styles.chatHeader}>
        <button onClick={showSendMessageModal}>Send message</button>
      </div>
    </div>
  );
};
