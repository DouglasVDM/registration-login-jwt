import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// COMPONENTS
import Courts from './Courts';
import Court from './Court';
import Booking from './Booking';
import Users from './Users';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [courts, setCourts] = useState([]);
  const [courtId, setCourtId] = useState([]);

  const getName = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();
      console.log('parseResponse_dashboard', parseResponse)
      setName(parseResponse.user_name);

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


  // GET ALL USERS
  const getUsers = async () => {
    try {
      const responseEmail = await fetch('http://localhost:5000/users/:userEmail', {
        method: 'GET'
      });

      const responseUser = await fetch('http://localhost:5000/users', {
        method: 'GET'
      });

      const parseResponse = await responseUser.json();
      console.log('parseResponse_users', parseResponse);
      setUsers(parseResponse);
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  // GET USER BY EMAIL
  const getUserByEmail = async () => {
    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'GET'
      });

      const parseResponse = await response.json();
      console.log('parseResponse_userByEmail', parseResponse);

      setUserEmail(parseResponse);
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, []);


  // GET ALL COURTS
  const getCourts = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/courts', {
        method: 'GET'
      });

      const parseResponse = await response.json();
      console.log('parseResponse_court', parseResponse);
      setCourts(parseResponse);

    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    getCourts();
  }, []);


  const getUserEmail = (user_email) => {
    setUserEmail(user_email);
    console.log('user_email =>', user_email)
  };


  const getCourtId = (court_id) => {
    setCourtId(court_id);
  };

  return (
    <Fragment>
      <h1>Welcome back {name}!</h1>
      <br />
      <Users users={users} userEmail={userEmail} getUserEmail={getUserEmail} />
      <br />
      <Booking courts={courts} courtId={courtId} userEmail={userEmail} getUserEmail={getUserEmail} getCourtId={getCourtId} />
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
