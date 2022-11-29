import React, {useState} from 'react';
import {Button} from '../button';
import {useEventService} from '../../lib/services/event-service';
import {useToastContext} from '../../lib/context/toast';
import styles from './create-event.module.css';

export const CreateEvent = ({dismissModal, chatId}) => {
  const {showSuccessToast} = useToastContext();
  const {isLoading, isError, post} = useEventService.useCreateEvent();

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const createEvent = async () => {
    if (!name || !time || !date || !location || !description) {
      return alert('Please fill in all empty fields!');
    }

    await post({name, time, date, location, description, chatId}).then(() => {
      showSuccessToast('Successfully created an event!');
      dismissModal();
    });
  };

  return (
    <>
      <form>
        <span className={styles.inputTitle}>Event Name:</span>
        <input
          className={styles.regularInput}
          placeholder="Event name"
          name="eventName"
          onChange={(e) => setName(e.target.value)}
        />
        <span className={styles.inputTitle}>Event Time:</span>
        <input
          className={styles.regularInput}
          name="mdy"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className={styles.regularInput}
          name="eventTime"
          type="time"
          onChange={(e) => setTime(e.target.value)}
        />
        <span className={styles.inputTitle}>Location:</span>
        <input
          className={styles.regularInput}
          name="locationSearch"
          type="search"
          placeholder="Search for location"
          onChange={(e) => setLocation(e.target.value)}
        ></input>
        <span className={styles.inputTitle}>Description</span>
        <textarea
          className={styles.descriptionTextArea}
          name="eventDescription"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </form>
      {isError && <p>An error occured</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Button onClick={createEvent}>Create event</Button>
      )}
    </>
  );
};
