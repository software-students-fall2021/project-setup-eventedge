import React from 'react';
import {useToastContext} from '../../lib/context/toast';
import {Toast} from './toast';
import styles from './toast-registry.module.css';

export const ToastRegistry = () => {
  const {visibleToasts, hideToast} = useToastContext();

  const mapToasts = visibleToasts.map(({type, message, id}) => (
    <Toast
      key={id}
      onClose={() => hideToast(id)}
      type={type}
      message={message}
    />
  ));

  return <div className={styles.toastRegistry}>{mapToasts}</div>;
};
