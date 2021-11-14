import React, {useState} from 'react';
import styles from './register.module.css';
import {useAuthContext} from '../../lib/context/auth';

export const Register = () => {
  const {register} = useAuthContext();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const onFormSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password || !confirmPassword) {
      return alert('Please fill all empty fields!');
    }

    if (password !== confirmPassword) {
      return alert('Passwords do not match!');
    }

    try {
      setLoading(true);

      await register({username, password});
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register </h1>
      <form>
        <input
          onChange={onUsernameChange}
          name="username"
          type="text"
          placeholder="Username"
          className={styles.input}
        />
        <input
          onChange={onPasswordChange}
          name="password"
          type="password"
          placeholder="Password"
          className={styles.input}
        />
        <input
          onChange={onConfirmPasswordChange}
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          className={styles.input}
        />
        {isError && <p>User with such name exists</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={onFormSubmit} className={styles.registerButton}>
            Register
          </button>
        )}
      </form>
    </div>
  );
};
