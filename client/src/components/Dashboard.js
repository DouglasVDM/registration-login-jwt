import React, { Fragment, useEffect, useState } from 'react';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getName = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();
      console.log('parseResponse=>', parseResponse);

      setName(parseResponse.user_name)
    } catch (err) {
      console.error(err)
    }
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  }

  useEffect(() => {
    getName();
  }, []);

  return (
    <Fragment>
      <h1>Dashboard {name}</h1>
      <button className='btn btn-primary' onClick={event => logout(event)}>Logout</button>
    </Fragment>
  );
};

export default Dashboard;
