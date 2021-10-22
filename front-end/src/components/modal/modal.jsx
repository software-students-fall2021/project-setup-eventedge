import React from 'react';
import styles from './modal.module.css';

export const Modal = ({title, children, onClose}) => (
  <div className={styles.modal}>
    <div className={styles.modalHeader}>
      <h3>{title}</h3>
      <button className={styles.closeButton} onClick={onClose}>
        ✕
      </button>
    </div>
    <div className={styles.modalContainer}>{children}</div>
  </div>
);
