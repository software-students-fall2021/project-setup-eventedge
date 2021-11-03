import React, {useEffect, useState} from 'react';
import styles from './chat.module.css';
import {useParams} from 'react-router-dom';
// import {useChatService} from '../../lib/services/chat-service';
import {useModalContext} from '../../lib/context/modal';
import {Link} from 'react-router-dom';
// import socketIOClient from 'socket.io-client';
import {authService} from '../../lib/services/auth-service';

export const Chat = (props) => {
  const {chatId} = useParams();
  // const {isLoading, isError, data} = useChatService.useChatMessages(chatId);
  const {showModal} = useModalContext();

  const showMembersModal = () => showModal('membersList', {id: chatId});

  const showSendMessageModal = () =>
    showModal('sendMessage', {socket: props.socket, chatId: chatId});
  const showCreateEventModal = () => showModal('createEvent');

  // const [response, setResponse] = useState('');

  const username = authService().getUsername();
  // console.log(chatId);
  const [testData, setTestData] = useState([]);

  const testDataHandler = (msgObj) => {
    setTestData((prevArr) => {
      return [...prevArr, msgObj];
    });
  };

  useEffect(() => {
    console.log('testData', testData);
    // if (testData[0] === null){}
  }, [testData]);

  useEffect(() => {
    props.socket.emit('joinRoom', {username, chatId});

    props.socket.emit('retrieveMsgs', {chatId});

    props.socket.on('retrieveMsgs', (msgs) => {
      console.log('rM', msgs);
      if (msgs !== null) {
        setTestData(msgs);
      } else {
        setTestData([]);
      }
    });

    props.socket.on('sendMsg', (msgObj) => {
      console.log('30', msgObj);
      // console.log(data);
      testDataHandler(msgObj);
    });
  }, []);

  // const mapChatMessages = isLoading ? (
  //   <p>Loading...</p>
  // ) : (
  //   testData.map((obj) => {
  //     const text = obj.username === username ? (
  //       <div key={obj.id}>
  //         <p className={styles.self}>
  //           <strong>{obj.username}</strong> : {obj.message} ({obj.date}){' '}
  //         </p>
  //       </div>)
  //     :
  //       (<div key={obj.id}>
  //         <p>
  //           <strong>{obj.username}</strong> : {obj.message} ({obj.date}){' '}
  //         </p>
  //       </div>)

  //     return text
  //   })
  // );
  const mapChatMessages = testData.map((obj) => {
    const text =
      obj.username === username ? (
        <div key={obj.id}>
          <p className={styles.self}>
            <strong>{obj.username}</strong> : {obj.message} ({obj.date}){' '}
          </p>
        </div>
      ) : (
        <div key={obj.id}>
          <p>
            <strong>{obj.username}</strong> : {obj.message} ({obj.date}){' '}
          </p>
        </div>
      );

    return text;
  });

  // if (isError) {
  //   return <p>An error occured</p>;
  // }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <button onClick={showCreateEventModal}>Create Event</button>
        {/* <p>Here: {response}</p> */}
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
