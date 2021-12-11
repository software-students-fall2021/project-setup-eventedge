import React from 'react';
import styles from './loader.module.css';
import loaderImage from '../../assets/loader.svg';

export const Loader = () => (
  <div className={styles.loader}>
    <img src={loaderImage} alt="Loading..." />
  </div>
);
