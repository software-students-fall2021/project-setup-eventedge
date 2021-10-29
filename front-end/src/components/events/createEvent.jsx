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
                <h1> Event Time </h1>
                <label htmlFor="dog-names">Choose a dog name:</label>
                <select name="dog-names" id="dog-names">Haha</select>
            </form> 
        </div>
    )
}