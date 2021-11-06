import React from 'react';
import styles from './landing-page.module.css';
import {Link} from 'react-router-dom';
import landingGif from './assets/calendar.gif';

export const LandingPage = () => {
  return (
    <>
      <div className={styles.container}>
        <img src={landingGif} />

        <h4>
          EventEdge came out of wanting to connect communities together in a new
          way. When using EventEdge, you create group chats where you can talk,
          create, and plan events with your peers. EventEdge puts all your
          events in one place, keeping your schedule organized and ensuring you
          never miss what is happening with all of the different groups you are
          a part of. To explore more, register! To get back to your chats and
          events, login!
        </h4>

        <Link to="/login">
          <button className={styles.button}> Login</button>
        </Link>

        <Link to="/register">
          <button className={styles.button}> Register</button>
        </Link>
      </div>
    </>
  );
};
