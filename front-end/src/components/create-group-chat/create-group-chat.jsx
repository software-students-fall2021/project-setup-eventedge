import React, {useState} from 'react';
import {AddUserButton} from './add-user-button';
import {useChatService} from '../../lib/services/chat-service';

export const CreateGroupChat = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchFilterWord, setSearchFilterWord] = useState('');
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
    <ul>
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

  console.log(selectedUsers);

  return (
    <>
      <input type="text" placeholder="Group chat name" />
      <input
        type="text"
        placeholder="Search for users..."
        onChange={onSearchChange}
      />
      <button>Create chat</button>
      {isError ? <p>An error occured</p> : mapUsers}
    </>
  );
};
