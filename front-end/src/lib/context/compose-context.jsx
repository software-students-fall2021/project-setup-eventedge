import React from 'react';
import {ToastContextProvider} from './toast';
import {ModalContextProvider} from './modal';
import {AuthContextProvider} from './auth';

export const ComposeContext = ({children}) => (
  <ToastContextProvider>
    <ModalContextProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ModalContextProvider>
  </ToastContextProvider>
);
