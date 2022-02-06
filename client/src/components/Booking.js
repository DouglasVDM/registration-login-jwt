import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Booking = ({ courtId, courts, getCourtId }) => {
  const [inputs, setInputs] = useState({
    court_id: { courtId },
    booking_date: '',
    time_in: '',
    time_out: ''
  });

  const { court_id, booking_date, time_in, time_out } = inputs;

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault()

    try {
      const body = { court_id, booking_date, time_in, time_out };
      const response = await fetch('http://localhost:5000/dashboard/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();
      console.log('parseResponse_booking', parseResponse);

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center my-5'>Booking</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="date"
          name='booking_date'
          placeholder='date'
          className='form-control my-3'
          value={booking_date}
          onChange={event => onChange(event)}
        />
        <input
          type="time"
          name='time_in'
          placeholder='start time'
          className='form-control my-3'
          value={time_in}
          onChange={event => onChange(event)}
        />
        <input
          type="time"
          name='time_out'
          placeholder='end time'
          className='form-control my-3'
          value={time_out}
          onChange={event => onChange(event)}
        />
        <button className="btn btn-success btn-block">Submit</button>
        {/* <Link to='/dashboard'>Login</Link> */}
      </form>
    </Fragment>
  );
};

export default Booking;
