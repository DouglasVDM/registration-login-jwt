import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  });

  const { email, password, name } = inputs;

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault()

    try {
      const body = { email, password, name };
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();
      console.log('parseResponse=>', parseResponse);

      localStorage.setItem('token', parseResponse.token);
      setAuth(true);
    } catch (err) {
      console.error(err.message)

    }
  };

  return (
    <Fragment>
      <h1 className='text-center my-5'>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name='email'
          placeholder='email'
          className='form-control my-3'
          value={email}
          onChange={event => onChange(event)}
        />
        <input
          type="password"
          name='password'
          placeholder='password'
          className='form-control my-3'
          value={password}
          onChange={event => onChange(event)}
        />
        <input
          type="text"
          name='name'
          placeholder='name'
          className='form-control my-3'
          value={name}
          onChange={event => onChange(event)}
        />
        <button className="btn btn-success btn-block">Submit</button>
        <Link to='/login'>Login</Link>
      </form>
    </Fragment>
  );
};

export default Register;
