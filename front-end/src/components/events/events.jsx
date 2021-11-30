import React from 'react';
import {useEventService} from '../../lib/services/event-service';
import styles from './events.module.css';
import {useModalContext} from '../../lib/context/modal';
import {Link} from 'react-router-dom';
import {getDateString} from '../../lib/utils/get-date-string';

export const Events = () => {
  const {showModal} = useModalContext();
  const {isLoading, isError, data} = useEventService.useMyEvents();

  const showPendingEventsModal = () => showModal('pendingEvents');

  const mapEvents = isLoading ? (
    <p>Loading...</p>
  ) : (
    data?.map(({date, name, id, chatId}) => (
      <div className={styles.box} key={id}>
        <p>Name: {name}</p>
        <p>Date/Time: {getDateString(date)}</p>
        <Link to={`/chat/${chatId}`}>
          <button className={styles.goToChatButton}>Go to chat</button>
        </Link>
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
