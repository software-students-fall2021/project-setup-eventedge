import React from 'react';
import {useAuthContext} from '../../../lib/context/auth';
import {Redirect} from 'react-router';

export const PublicOnlyComponent = ({children}) => {
  const {isUserLoggedIn} = useAuthContext();

  return isUserLoggedIn ? <Redirect to="/chats" /> : children;
};
