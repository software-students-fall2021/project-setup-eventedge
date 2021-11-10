import React, {useEffect} from 'react';
import styles from './pending-events.module.css';
import {useEventService} from '../../lib/services/event-service';

export const PendingEvents = () => {
  const {data: eventData, post} = useEventService.useAcceptEvent();
  const {isLoading, isError, data, setData} =
    useEventService.useMyPendingEvents();

  useEffect(() => {
    if (data && eventData) {
      setData((prevData) =>
        prevData.filter((event) => event.id !== eventData.event.id)
      );
    }
  }, [eventData]);

  const acceptEvent =
    (id, accept = true) =>
    async () =>
      await post({id, accept});

  const mapPendingEvents = isLoading ? (
    <p>Loading...</p>
  ) : (
    data?.map(({date, title, id}) => (
      <div className={styles.box} key={id}>
        <p>Name: {title}</p>
        <p>Date/Time: {date}</p>
        <button className={styles.acceptButton} onClick={acceptEvent(id)}>
          Accept
        </button>
        <button
          className={styles.declineButton}
          onClick={acceptEvent(id, false)}
        >
          Decline
        </button>
      </div>
    ))
  );

  return (
    <div className={styles.container}>
      {isError ? <p>An error occured</p> : mapPendingEvents}
    </div>
  );
};
