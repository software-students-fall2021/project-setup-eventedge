import React, {createContext, useState, useContext} from 'react';
import {v4 as uuidv4} from 'uuid';

const ToastContext = createContext();

export const ToastContextProvider = ({children}) => {
  const [visibleToasts, setVisibleToasts] = useState([]);

  const showToast = (type, message) =>
    setVisibleToasts((prevVisibleToasts) => [
      ...prevVisibleToasts,
      {id: uuidv4(), type, message},
    ]);

  const showSuccessToast = (message) => showToast('success', message);

  const showErrorToast = (message) => showToast('error', message);

  const hideToast = (toastId) =>
    setVisibleToasts((prevVisibleToasts) =>
      prevVisibleToasts.filter(({id}) => id !== toastId)
    );

  const dismissAllToasts = () => setVisibleToasts([]);

  return (
    <ToastContext.Provider
      value={{
        hideToast,
        dismissAllToasts,
        visibleToasts,
        showSuccessToast,
        showErrorToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return useContext(ToastContext);
};
