import React from 'react';
import styles from './toast.module.css';

const TOAST_CLASSNAMES = {
  error: styles.error,
  success: styles.success,
};

const getToastClassName = (type) => `${styles.toast} ${TOAST_CLASSNAMES[type]}`;

export const Toast = ({type, message, onClose}) => (
  <div className={getToastClassName(type)}>
    {message}
    <button onClick={onClose}>Close</button>
  </div>
);
