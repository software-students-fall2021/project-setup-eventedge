import React, {useState, useEffect} from 'react';
import styles from './chat.module.css';
import {useParams} from 'react-router-dom';
import {useChatService} from '../../lib/services/chat-service';
import {useModalContext} from '../../lib/context/modal';
import {Link} from 'react-router-dom';
import socketIOClient from 'socket.io-client';

export const Chat = () => {
  const {chatId} = useParams();
  const {isLoading, isError, data} = useChatService.useChatMessages(chatId);
  const {showModal} = useModalContext();

  const showMembersModal = () => showModal('membersList');

  const showSendMessageModal = () => showModal('sendMessage');
  const showCreateEventModal = () => showModal('createEvent');

  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient('http://localhost:8000', {
      transport: ['websocket', 'polling', 'flashsocket'],
    });
    socket.on('FromAPI', (data) => {
      console.log(data);
      setResponse(data);
    });
  }, []);

  const mapChatMessages = isLoading ? (
    <p>Loading...</p>
  ) : (
    data?.map(({id, username, date, message}) => (
      <div key={id}>
        <p>
          <strong>{username}</strong> : {message} ({date}){' '}
        </p>
      </div>
    ))
  );

  if (isError) {
    return <p>An error occured</p>;
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <button onClick={showCreateEventModal}>Create Event</button>
        <p>Here: {response}</p>
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
