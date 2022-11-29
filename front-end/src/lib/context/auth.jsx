import React, {createContext, useState, useContext, useEffect} from 'react';
import {authService} from '../services/auth-service';
import {useModalContext} from './modal';
import {useToastContext} from './toast';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const {dismissAllModals} = useModalContext();
  const {dismissAllToasts} = useToastContext();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isUserLoggedIn = !!loggedInUser;
  const loggedInUsername = loggedInUser?.username;

  useEffect(() => {
    const authData = authService().getAuthData();

    if (authData) {
      authService().isTokenExpired() ? logout() : setLoggedInUser(authData);
    }
  }, []);

  const logout = () => {
    dismissAllModals();
    dismissAllToasts();
    authService().logout();
    setLoggedInUser(null);
  };

  const login = async ({username, password}) => {
    const userData = await authService().login({username, password});

    setLoggedInUser(userData);
  };

  const register = async ({username, password}) => {
    const userData = await authService().register({username, password});

    setLoggedInUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{isUserLoggedIn, loggedInUsername, login, logout, register}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
