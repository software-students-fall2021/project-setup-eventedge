import React from 'react';
import {useEventService} from '../../lib/services/event-service';
import styles from './events.module.css';
import {useModalContext} from '../../lib/context/modal';

export const Events = () => {
  const {showModal} = useModalContext();
  const {isLoading, isError, data} = useEventService.useMyEvents();

  const showPendingEventsModal = () => showModal('pendingEvents');

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
    <>
      <button className={styles.pendingButton} onClick={showPendingEventsModal}>
        Pending Events
      </button>
      {isError ? (
        <p>An error occured</p>
      ) : (
        <div className={styles.container}>{mapEvents}</div>
      )}
    </>
  );
};
