import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useChatService} from '../../lib/services/chat-service';
import {useModalContext} from '../../lib/context/modal';
import styles from './chats.module.css';

export const Chats = () => {
  const {isLoading, isError, data} = useChatService.useChats();

  const {showModal} = useModalContext();
  const [searchFilterWord, setSearchFilterWord] = useState('');

  const showCreateGroupChatModal = () => showModal('createGroupChat');

  const onSearchChange = (event) =>
    setSearchFilterWord(event.target.value.toLowerCase().trim());

  const mapChats = isLoading ? (
    <p>Loading...</p>
  ) : (
    data
      ?.filter(
        ({chatName}) =>
          !searchFilterWord || chatName.toLowerCase().includes(searchFilterWord)
      )
      .map(({id, chatName}) => (
        <Link className={styles.chatLink} key={id} to={`/chat/${id}`}>
          <li className={styles.listItem}>{chatName}</li>
        </Link>
      ))
  );

  if (isError) {
    return <p>An error occured</p>;
  }

  return (
    <>
      <div className={styles.header}>
        <button className={styles.plus} onClick={showCreateGroupChatModal}>
          +
        </button>
        <input className={styles.center} onChange={onSearchChange} />
      </div>

      <ul className={styles.list}>{mapChats}</ul>
    </>
  );
};
