import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// COMPONENTS
import Courts from './Courts';
import Court from './Court';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [courts, setCourts] = useState([]);
  const [courtId, setCourtId] = useState('')

  const getName = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();
      setName(parseResponse.user_name)

    } catch (err) {
      console.error(err)
    }
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out successfully!');
  };

  useEffect(() => {
    getName();
  }, []);


  // GET ALL COURTS
  const getCourts = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/courts', {
        method: 'GET'
      });

      const parseResponse = await response.json();
      setCourts(parseResponse);

    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    getCourts();
  }, []);


  const getCourtId = (court_id) => {
    setCourtId(court_id);
  };

  return (
    <Fragment>
      <h1>Welcome back {name}!</h1>
      <br />
      <Courts courts={courts} getCourtId={getCourtId} />
      <br />
      <Court courtId={courtId} />
      <br />
      <button className='btn btn-primary' onClick={event => logout(event)}>Logout</button>
    </Fragment>
  );
};

export default Dashboard;
