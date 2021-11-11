import React, {useState, useEffect} from 'react';
import {AddUserButton} from './add-user-button';
import {AddedUsersList} from './added-users-list';
import {useUsersService} from '../../lib/services/users-service';
import {useChatService} from '../../lib/services/chat-service';
import {Button} from '../button';
import {useHistory} from 'react-router-dom';
import styles from './create-group-chat.module.css';

export const CreateGroupChat = ({dismissModal}) => {
  const history = useHistory();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchFilterWord, setSearchFilterWord] = useState('');
  const [chatName, setChatName] = useState('');
  const {isLoading, isError, data} = useUsersService.useAllUsers();
  const {
    isError: isChatCreationError,
    data: newChatData,
    post,
  } = useChatService.useCreateChat();

  useEffect(() => {
    if (newChatData && !isChatCreationError) {
      history.push(`/chat/${newChatData.id}`);
      dismissModal();
    }
  }, [newChatData, isChatCreationError]);

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

  const onCreateChatClick = async (e) => {
    e.preventDefault();

    if (!selectedUsers.length) {
      return alert('Please select at least one user!');
    }

    if (!chatName) {
      return alert('Please enter chat name!');
    }

    await post({
      chatName,
      usersList: selectedUsers.map((user) => user.username),
    });
  };

  return (
    <>
      <Button onClick={onCreateChatClick}>Create chat</Button>
      {isChatCreationError && <p>An error occured when creating the chat</p>}
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
