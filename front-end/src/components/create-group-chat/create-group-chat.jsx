import React, {useState} from 'react';
import {useChatService} from '../../lib/services/chat-service';

export const CreateGroupChat = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchFilterWord, setSearchFilterWord] = useState('');
  const {isLoading, isError, data} = useChatService.useChatMembers();

  const selectUser = (user) => () =>
    setSelectedUsers((prevSelected) => [...prevSelected, user]);

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
        .map(({id, username}) => (
          <li key={id}>
            {username}
            <button onClick={selectUser({id, username})}>Add</button>
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
