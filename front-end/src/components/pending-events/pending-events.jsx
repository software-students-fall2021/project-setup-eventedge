import React, {useEffect} from 'react';
import styles from './pending-events.module.css';
import {useEventService} from '../../lib/services/event-service';
import {getDateString} from '../../lib/utils/get-date-string';
import {useToastContext} from '../../lib/context/toast';

export const PendingEvents = () => {
  const {showSuccessToast} = useToastContext();
  const {data: eventData, post} = useEventService.useAcceptEvent();
  const {isLoading, isError, data, setData} =
    useEventService.useMyPendingEvents();

  useEffect(() => {
    if (data && eventData) {
      setData((prevData) =>
        prevData.filter((event) => event.id !== eventData.id)
      );
    }
  }, [eventData]);

  const acceptEvent =
    (id, accept = true) =>
    async () => {
      await post({eventId: id, accept});
      showSuccessToast('Accepted a pending event!');
    };

  const mapPendingEvents = isLoading ? (
    <p>Loading...</p>
  ) : (
    data?.map(({date, name, id}) => (
      <div className={styles.box} key={id}>
        <p>Name: {name}</p>
        <p>Date/Time: {getDateString(date)}</p>
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
