import React, {useState} from 'react';
import styles from './login.module.css';
import {Link} from 'react-router-dom';
import {useAuthService} from '../../lib/services/auth-service';

export const Login = () => {
  const {isLoading, isError, post} = useAuthService.useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onSubmit = async () => {
    if (!username || !password) {
      return alert('Please fill all fields!');
    }

    await post({username, password});
    window.location = '/chats';
  };

  const onEnterPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={styles.form}>
      <h1>Login</h1>
      <input
        type="text"
        className={styles.input}
        placeholder="Username"
        onChange={onUsernameChange}
        name="username"
      />
      <input
        type="password"
        className={styles.input}
        placeholder="Password"
        onChange={onPasswordChange}
        name="password"
        onKeyPress={onEnterPress}
      />
      {isError && <p>Incorrect username or password</p>}
      {isLoading ? <p>Loading...</p> : <button onClick={onSubmit}>Login</button>}
      <h6>Not a member?</h6>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};
