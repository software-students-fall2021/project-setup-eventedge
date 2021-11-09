import React, {useState} from 'react';
import styles from './register.module.css';
// import {Input} from '../input';
//do I have to control  inputs' values?

export const Register = () => {
  const [registrationInfo, setRegistrationInfo] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const onValueChange = (event) => {
    const {value, name} = event.target;

    setRegistrationInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const {username, password, confirmPassword} = registrationInfo;

    if (!username || !password || !confirmPassword) {
      return alert('Please fill all empty fields!');
    }

    if (password !== confirmPassword) {
      return alert('Passwords do not match!');
    }

    console.log(registrationInfo);
  };

  return (
    <div>
      <h1>Register </h1>
      <form>
        <input
          onChange={onValueChange}
          name="username"
          type="text"
          placeholder="Username"
          className={styles.input}
        />
        <input
          onChange={onValueChange}
          name="password"
          type="password"
          placeholder="Password"
          className={styles.input}
        />
        <input
          onChange={onValueChange}
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          className={styles.input}
        />
        <button onClick={onFormSubmit} className={styles.registerButton}>
          Register
        </button>
      </form>
    </div>
  );
};
