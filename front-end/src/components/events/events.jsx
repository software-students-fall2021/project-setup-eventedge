import React from 'react';
import {useEventService} from '../../lib/services/event-service';
import styles from './events.module.css';
import {useModalContext} from '../../lib/context/modal';
import {Link} from 'react-router-dom';
import {getDateString} from '../../lib/utils/get-date-string';
import {Button} from '../button';
import {Loader} from '../loader';

export const Events = () => {
  const {showModal} = useModalContext();
  const {isLoading, isError, data, setData} = useEventService.useMyEvents();

  const showPendingEventsModal = () =>
    showModal('pendingEvents', {setEventsData: setData});

  const mapEvents = isLoading ? (
    <Loader />
  ) : (
    data?.map(({date, name, id, chatId}) => (
      <div className={styles.box} key={id}>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Date/Time:</strong> {getDateString(date)}
        </p>
        <Link to={`/chat/${chatId}`}>
          <button
            className={styles.goToChatButton}
          >{`Go to event's chat`}</button>
        </Link>
      </div>
    ))
  );

  const areThereNoEvents = data?.length === 0;

  return (
    <>
      <Button className={styles.pendingButton} onClick={showPendingEventsModal}>
        View my pending events
      </Button>
      {isError ? (
        <p>An error occured</p>
      ) : areThereNoEvents ? (
        <p>You currently have no events lined up.</p>
      ) : (
        mapEvents
      )}
    </>
  );
};
