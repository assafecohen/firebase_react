import React, { useState } from 'react';

import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);

  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push('/');
    } catch (err) {
      console.error('Authentication Error', err);
      setFirebaseError(err.message);
    }
  }
  return (
    <div className='mv3'>
      <h2>{login ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className='flex flex-column'>
        {!login && (
          <input
            type='text'
            name='name'
            value={values.name}
            placeholder='Your name'
            autoComplete='off'
            onChange={handleChange}
          />
        )}
        <input
          type='email'
          name='email'
          onBlur={handleBlur}
          value={values.email}
          className={errors.email && 'error-input'}
          placeholder='Your email'
          autoComplete='off'
          onChange={handleChange}
        />
        {errors.email && <p className='error-text'>{errors.email}</p>}
        <input
          type='password'
          name='password'
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && 'error-input'}
          placeholder='Choose a secure password'
          autoComplete='off'
          onChange={handleChange}
        />
        {errors.password && <p className='error-text'>{errors.password}</p>}
        {firebaseError && <p className='error-text'>{firebaseError}</p>}
        <div className='flex mt3'>
          <button
            type='submit'
            className='button pointer mr2'
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'grey' : 'orange' }}
          >
            Submit
          </button>
          <button
            type='button'
            className='button pointer'
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {login ? 'Need to create account?' : 'Already have an account?'}
          </button>
        </div>
      </form>
      <div className='forgot-password'>
        <Link to='/forgot'>Forgot password?</Link>
      </div>
    </div>
  );
}

export default Login;
