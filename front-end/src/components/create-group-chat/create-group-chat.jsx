import React, {useState} from 'react';
import {AddUserButton} from './add-user-button';
import {AddedUsersList} from './added-users-list';
import {useChatService} from '../../lib/services/chat-service';
import {Button} from '../button';
import styles from './create-group-chat.module.css';

export const CreateGroupChat = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchFilterWord, setSearchFilterWord] = useState('');
  const [chatName, setChatName] = useState('');
  const {isLoading, isError, data} = useChatService.useChatMembers();

  const addUser = (user) => () =>
    setSelectedUsers((prevSelected) => [...prevSelected, user]);

  const removeUser = (user) => () =>
    setSelectedUsers((prevSelected) =>
      prevSelected.filter(({id}) => id !== user.id)
    );

  const isUserSelected = (user) =>
    selectedUsers.findIndex(({id}) => id === user.id) !== -1;

  const mapUsers = isLoading ? (
    <p>Loading...</p>
  ) : (
    <ul className={styles.usersList}>
      {data
        ?.filter(
          ({username}) =>
            !searchFilterWord ||
            username.toLowerCase().includes(searchFilterWord)
        )
        .map((user) => (
          <li key={user.id}>
            {user.username}
            <AddUserButton
              isUserSelected={isUserSelected(user)}
              addUser={addUser(user)}
              removeUser={removeUser(user)}
            />
          </li>
        ))}
    </ul>
  );

  const onSearchChange = (event) =>
    setSearchFilterWord(event.target.value.toLowerCase().trim());

  const onChatNameChange = (event) => setChatName(event.target.value.trim());

  const onCreateChatClick = (e) => {
    e.preventDefault();

    if (!selectedUsers.length) {
      return alert('Please select at least one user!');
    }

    if (!chatName) {
      return alert('Please enter chat name!');
    }
  };

  return (
    <>
      <Button onClick={onCreateChatClick}>Create chat</Button>
      <input
        type="text"
        placeholder="Group chat name"
        className={styles.input}
        onChange={onChatNameChange}
      />
      <input
        type="text"
        placeholder="Search for users..."
        onChange={onSearchChange}
        className={styles.input}
      />
      <AddedUsersList usersList={selectedUsers} />
      {isError ? <p>An error occured</p> : mapUsers}
    </>
  );
};
