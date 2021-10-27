import React from 'react';
import {useEventService} from '../../lib/services/event-service';
import styles from './events.module.css';

export const Events = () => {
  const {isLoading, isError, data} = useEventService.useMyEvents();

  const mapEvents = isLoading ? (
    <p>Loading...</p>
  ) : (
    data?.map(({date, title, id}) => (
      <div className={styles.box} key={id}>
        <p>Name: {title}</p>
        <p>Date/Time: {date}</p>
      </div>
    ))
  );

  return (
    <React.Fragment>
      <button className={styles.pendingButton}>Pending Events</button>

      {isError ? (
        <p>An error occured</p>
      ) : (
        <div className={styles.container}>{mapEvents}</div>
      )}
    </React.Fragment>
  );
};
