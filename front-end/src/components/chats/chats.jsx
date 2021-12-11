import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useChatService} from '../../lib/services/chat-service';
import {useModalContext} from '../../lib/context/modal';
import {Loader} from '../loader';
import styles from './chats.module.css';

export const Chats = () => {
  const {isLoading, isError, data} = useChatService.useChats();

  const {showModal} = useModalContext();
  const [searchFilterWord, setSearchFilterWord] = useState('');

  const areChatsEmpty = data?.length === 0;

  const showCreateGroupChatModal = () => showModal('createGroupChat');

  const onSearchChange = (event) =>
    setSearchFilterWord(event.target.value.toLowerCase().trim());

  const mapChats = isLoading ? (
    <Loader />
  ) : (
    data
      ?.filter(
        ({name}) =>
          !searchFilterWord || name.toLowerCase().includes(searchFilterWord)
      )
      .map(({id, name, usersCount}) => (
        <Link className={styles.chatLink} key={id} to={`/chat/${id}`}>
          <li className={styles.listItem}>
            <strong>{name}</strong>
            <span>
              {usersCount} {usersCount === 1 ? 'person' : 'people'} in the chat
            </span>
          </li>
        </Link>
      ))
  );

  if (isError) {
    return <p>An error occured</p>;
  }

  return (
    <>
      <button
        className={styles.createChatButton}
        onClick={showCreateGroupChatModal}
      >
        Create chat
      </button>
      {areChatsEmpty ? (
        <p className={styles.noChatsText}>
          Your chat list is currently empty. You can create one above!
        </p>
      ) : (
        <>
          <input
            className={styles.searchCurrentChatsInput}
            onChange={onSearchChange}
            placeholder={`Search ${data?.length} chats...`}
          />
          <ul className={styles.list}>{mapChats}</ul>
        </>
      )}
    </>
  );
};
