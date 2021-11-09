import React from 'react';
import {Button} from '../button';

export const CreateEvent = () => (
  <>
    <form>
      <h1>Event Name:</h1>
      <input placeholder="Event name" name="eventName" />
      <hr></hr>
      <h1>Event Time:</h1>
      <input name="mdy" type="date"></input>
      <input name="eventTime" type="time"></input>
      <hr></hr>
      <h1>Location:</h1>
      <input
        name="locationSearch"
        type="search"
        placeholder="Search for location"
      ></input>
      <hr></hr>
      <h1>Description</h1>
      <textarea name="eventDescription"></textarea>
    </form>
    <hr></hr>
    <Button>Create event</Button>
  </>
);
