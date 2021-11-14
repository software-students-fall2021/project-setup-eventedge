import React from 'react';
import {useAuthContext} from '../../../lib/context/auth';
import {Redirect} from 'react-router';

export const PrivateComponent = ({children}) => {
  const {isUserLoggedIn} = useAuthContext();

  return isUserLoggedIn ? children : <Redirect to="/login" />;
};
