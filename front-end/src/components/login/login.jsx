import React, {useState} from 'react';
import styles from './login.module.css';
import {Link} from 'react-router-dom';
import {useAuthContext} from '../../lib/context/auth';
import {useToastContext} from '../../lib/context/toast';

export const Login = () => {
  const {login} = useAuthContext();
  const {showErrorToast} = useToastContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onSubmit = async () => {
    if (!username || !password) {
      return alert('Please fill all fields!');
    }

    try {
      setIsLoading(true);

      await login({username, password});
    } catch (e) {
      setIsError(true);
      showErrorToast('An error occurred while trying to login!');
    } finally {
      setIsLoading(false);
    }
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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={onSubmit}>Login</button>
      )}
      <h6>Not a member?</h6>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};
