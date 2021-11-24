import React from 'react';
import styles from './landing-page.module.css';
import {Link} from 'react-router-dom';
import landingGif from './assets/calendar.gif';

export const LandingPage = () => {
  return (
    <>
    <div style={{height: '100%'}}>
      <div className={styles.container}>
        <h1 className={styles.title}>Plan Your Next Event</h1>
        <img className={styles.gif} src={landingGif} />
        <video autoPlay muted loop
            style={{
                width: '100%', position: 'absolute',
                left: '50%', top: '50%', height: '100%',
                objectFit: 'cover', transform: 'translate(-50%, -50%)', zIndex: "-1"
            }}>
                <source src="videos/lunchVid.mp4" type="video/mp4"/>
            </video>
<div className={styles.buttons}>
        <Link className={styles.link} to="/login">
          <button className={styles.button}> Login</button>
        </Link>

        <Link className={styles.link} to="/register">
          <button className={styles.button}> Register</button>
        </Link>
        </div>
        <img onClick={()=>window.location='/#next'}className={styles.arrow} src="imgs/arrow.svg"/>
      </div>
      <div id="next" className={styles.secondSection}>
        <h4>EventEdge came out of wanting to connect communities together in a new
          way.</h4>
        <h4>When using EventEdge, you can</h4>
        <ul>
          <li>create group chats</li>
          <li>talk,
          create, and plan events with your peers</li>
          <li>see all your
          events in one place</li>
        </ul>
        <h4>To explore more, register! To get back to your chats and
          events, login!</h4>

        <div>
          <label>From:</label> <br/>
          <input /> <br/><br/>
          <label>To: (Separate By Comma)</label> <br/>
          <input /> <br/><br/>
          <label>Message:</label> <br/>
          <textarea rows="10" cols="30"/>
          <br/><br/>
        </div>

      </div>


      <marquee>Thank you for visiting EventEdge. We hope you can use
        the product to boost efficiency when it comes to planning 
        your future events. If you find us to be a good service,
        let your friends know about EventEdge as well. For any
        further assistance, email eventedge@gmail.com.
      </marquee>
      </div>
    </>
  );
};
