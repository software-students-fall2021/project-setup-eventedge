import React, {useState} from 'react';
import styles from './login.module.css';
import {Link} from 'react-router-dom';
import {authService} from '../../lib/services/auth-service';

export const Login = () => {
  const [info, setInfo] = useState({
    username: '',
    password: '',
  });

  const infoHandler = (event) => {
    setInfo((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const loginHandler = () => {
    if (info.username === '' || info.password === '')
      alert('Please fill all fields!');
    else {
      authService().login(info.username);
      window.location = '/chats';
    }
  };

  const enter = (event) => {
    if (event.key === 'Enter') loginHandler();
  };

  return (
    <React.Fragment>
      <div className={styles.form}>
        <h1>Login</h1>
        <input
          className={styles.input}
          placeholder="Username"
          onChange={infoHandler}
          name="username"
        />
        <br />
        <br />
        <input
          className={styles.input}
          placeholder="Password"
          onChange={infoHandler}
          name="password"
          onKeyPress={enter}
        />
        <br />
        <br />
        <button onClick={loginHandler}>Login</button>

        <h6>Not a member?</h6>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </React.Fragment>
  );
};
