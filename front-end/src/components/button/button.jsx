import React from 'react';
import styles from './button.module.css';

export const Button = ({children, onClick, className = ''}) => (
  <button className={`${styles.button} ${className}`} onClick={onClick}>
    {children}
  </button>
);
