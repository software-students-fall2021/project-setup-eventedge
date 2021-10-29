import React from 'react';
//import {useEventService} from '../../lib/services/event-service';
import styles from './events.module.css';

export const CreateEvent = () => {
    return (
        <div>
            <form>
                <h1>Event Name:</h1>
                <input
                    className={styles.input}
                    placeholder="Event name"
                    name="eventName"
                />
                <hr></hr>

                <h1> Event Time: </h1>
                <input name="mdy" type="date"></input>
                <input name="eventTime" type="time"></input>  
                <hr></hr>  
                <h1>Location: </h1>
                <input name="locationSearch" type="search" placeholder="Search for location"></input>
                <hr></hr>
                <h1>Description</h1>
                <textarea name="eventDescription"></textarea>
            </form>
            <hr></hr>
            <button className={styles.createButton}>Create Event</button>
        </div>
    )
}