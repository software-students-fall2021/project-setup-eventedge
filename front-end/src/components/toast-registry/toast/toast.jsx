import React from 'react';
import styles from './toast.module.css';
import closeIcon from '../../../assets/close.svg';

const TOAST_CLASSNAMES = {
  error: styles.error,
  success: styles.success,
};

const getToastClassName = (type) => `${styles.toast} ${TOAST_CLASSNAMES[type]}`;

export const Toast = ({type, message, onClose}) => (
  <div className={getToastClassName(type)}>
    <span>{message}</span>
    <img src={closeIcon} alt="" onClick={onClose} />
  </div>
);
