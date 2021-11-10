import React, {useState} from 'react';
import {Button} from '../button';
import {useEventService} from '../../lib/services/event-service';

export const CreateEvent = ({dismissModal}) => {
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

    await post({name, time, date, location, description}).then(() => {
      dismissModal();
    });
  };

  return (
    <>
      <form>
        <h1>Event Name:</h1>
        <input
          placeholder="Event name"
          name="eventName"
          onChange={(e) => setName(e.target.value)}
        />
        <hr></hr>
        <h1>Event Time:</h1>
        <input
          name="mdy"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          name="eventTime"
          type="time"
          onChange={(e) => setTime(e.target.value)}
        />
        <hr></hr>
        <h1>Location:</h1>
        <input
          name="locationSearch"
          type="search"
          placeholder="Search for location"
          onChange={(e) => setLocation(e.target.value)}
        ></input>
        <hr></hr>
        <h1>Description</h1>
        <textarea
          name="eventDescription"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </form>
      <hr></hr>
      {isError && <p>An error occured</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Button onClick={createEvent}>Create event</Button>
      )}
    </>
  );
};
