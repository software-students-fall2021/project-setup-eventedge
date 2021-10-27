import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './chats.module.css';
import data from './data';

export const Chats = () => {
  const [filtered, setFiltered] = useState([]);

  const [bool, setBool] = useState(false);

  const searchHandler = (event) => {
    const searchVal = event.target.value.toLowerCase();
    const newArr = data.filter(({id, name}) => {
      const index = name.toLowerCase().indexOf(searchVal);
      console.log(id);
      if (index === 0) return true;
      else return false;
    });
    if (searchVal.length > 0 && newArr.length === 0) {
      setBool(true);
    } else if (searchVal.length > 0 && newArr.length !== 0) {
      setBool(true);
    } else {
      setBool(false);
    }
    setFiltered(newArr);
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <button className={styles.plus}>+</button>
        <input className={styles.center} onChange={searchHandler} />
      </div>

      <ul className={styles.list}>
        {bool
          ? filtered.map((chatObj, index) => {
              return (
                <div key={index}>
                  <li className={styles.listItem}>{chatObj.name}</li>
                </div>
              );
            })
          : data.map((chatObj, index) => {
              return (
                <div key={index}>
                  <Link className={styles.chatLink}>
                    <li className={styles.listItem}>{chatObj.name}</li>
                  </Link>
                </div>
              );
            })}
      </ul>
    </React.Fragment>
  );
};
