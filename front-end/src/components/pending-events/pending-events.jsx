import React from 'react';
import styles from './pending-events.module.css';
import {useEventService} from '../../lib/services/event-service';

export const PendingEvents = () => {
  const {isLoading, isError, data} = useEventService.useMyEvents();

  const mapPendingEvents = isLoading ? (
    <p>Loading...</p>
  ) : (
    data?.map(({date, title, id}) => (
      <div className={styles.box} key={id}>
        <p>Name: {title}</p>
        <p>Date/Time: {date}</p>
        <button className={styles.acceptButton}>Accept</button>
        <button className={styles.declineButton}>Decline</button>
      </div>
    ))
  );

  return (
    <div className={styles.container}>
      {isError ? <p>An error occured</p> : mapPendingEvents}
    </div>
  );
};
