import React, {useEffect} from 'react';
import styles from './pending-events.module.css';
import {useEventService} from '../../lib/services/event-service';
import {getDateString} from '../../lib/utils/get-date-string';
import {useToastContext} from '../../lib/context/toast';
import {Loader} from '../loader';

export const PendingEvents = ({setEventsData}) => {
  const {showSuccessToast} = useToastContext();
  const {data: eventData, post} = useEventService.useAcceptEvent();
  const {isLoading, isError, data, setData} =
    useEventService.useMyPendingEvents();

  useEffect(() => {
    if (data && eventData) {
      setData((prevData) =>
        prevData.filter((event) => event.id !== eventData.id)
      );

      if (eventData.accepted) {
        setEventsData((prevEventsData) => [eventData, ...prevEventsData]);
      }
    }
  }, [eventData]);

  const acceptEvent =
    (id, accept = true) =>
    async () => {
      await post({eventId: id, accept});
      showSuccessToast(accept ? 'Accepted an event!' : 'Declined an event!');
    };

  const areThereNoPendingEvents = data?.length === 0;

  const mapPendingEvents = isLoading ? (
    <Loader />
  ) : (
    data?.map(({date, name, id}) => (
      <div className={styles.box} key={id}>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Date/Time:</strong> {getDateString(date)}
        </p>
        <div className={styles.acceptanceButtons}>
          <button
            className={`${styles.acceptanceButton} ${styles.accept}`}
            onClick={acceptEvent(id)}
          >
            Accept
          </button>
          <button
            className={`${styles.acceptanceButton} ${styles.decline}`}
            onClick={acceptEvent(id, false)}
          >
            Decline
          </button>
        </div>
      </div>
    ))
  );

  return (
    <div className={styles.container}>
      {isError ? (
        <p>An error occured</p>
      ) : areThereNoPendingEvents ? (
        <p>You have no pending events.</p>
      ) : (
        mapPendingEvents
      )}
    </div>
  );
};
