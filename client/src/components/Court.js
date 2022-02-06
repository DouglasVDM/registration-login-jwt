import React, { useEffect, useState } from 'react';

const Court = ({ courtId }) => {

  const [bookings, setBookings] = useState([]);


  // GET ALL BOOKINGS BY COURT ID
  const getBookings = async () => {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/bookings/${courtId}`, {
        method: 'GET'
      });

      const parseResponse = await response.json();
      setBookings(parseResponse);

    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    getBookings();
  }, [courtId]);



  return (
    <div>
      <h1>Court {courtId} Bookings</h1>
      {bookings.map(({ booking_date, time_in, time_out, booking_id }) => {
        return (
          <div>
            <h6 style={{ background: 'skyblue' }} key={booking_id}>
              Booked: {booking_date} <br />{time_in} to {time_out}
            </h6>
          </div>
        )
      })}
    </div>
  );
};

export default Court;
