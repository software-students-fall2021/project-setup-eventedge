import React from 'react';

export const AddUserButton = ({isUserSelected, addUser, removeUser}) =>
  isUserSelected ? (
    <button onClick={removeUser}>Remove user</button>
  ) : (
    <button onClick={addUser}>Add user</button>
  );
