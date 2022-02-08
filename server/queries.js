const pool = require('./db');


// GET ALL USERS
const getUsers = async (req, res) => {
  try {

    const users = await pool.query(`SELECT * FROM users AS u ORDER BY user_name ASC`);

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error - getUsers');
  }
};


// GET USER BY EMAIL
const getUserByEmail = async (req, res) => {
  try {
    const { userEmail } = req.query;

    const user = await pool.query(`SELECT user_name, user_email FROM users AS u WHERE user_email = $1`, [userEmail]);

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error - getUserEmail');
  }
};


// ADD NEW BOOKING
const createBooking = ('/bookings', async (req, res) => {
  try {
    // 1. DESTRUCTURE req.body
    const { user_id, court_id, booking_date, time_in, time_out } = req.body;

    // 2. CHECK IF BOOKING EXIST (IF BOOKING EXIST THEN THROW ERROR)
    const booking = await pool.query('SELECT * FROM bookings WHERE (court_id, booking_date, time_in, time_out) = ($1, $2, $3, $4)', [court_id, booking_date, time_in, time_out]);

    if (booking.rows.length !== 0) {
      return res.json({ status: 'fail', message: 'Booking already exist' })
    };

    // 3 CHECK IF USER HAS BOOKED A COURT FOR THE WEEK
    const user = await pool.query('SELECT * FROM bookings WHERE (user_id) = ($1)', [user_id]);

    if (user.rows.length !== 0) {
      return res.json({ status: 'fail', message: 'User only allowed 1 booking per week' })
    };

    // 4, ENTER THE NEW BOOKING INSIDE OUR DATABASE
    const newBooking = await pool.query('INSERT INTO bookings (user_id, court_id, booking_date, time_in, time_out) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user_id, court_id, booking_date, time_in, time_out]);

    res.json({ status: "success", message: 'Booking created' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Add Booking Error');
  }
});


// PUT - UPDATE DATA ON EXISTING BOOKING
const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { user_id, court_id, booking_date, time_in, time_out } = req.body;

    // 2. CHECK IF BOOKING EXIST (IF BOOKING DOESN'T EXIST THEN THROW ERROR)
    // const booking = await pool.query('SELECT * FROM bookings WHERE (court_id, booking_date, time_in, time_out) = ($1, $2, $3, $4)', [court_id, booking_date, time_in, time_out]);

    // if (booking.rows.length === 0) {
    //   return res.json({ status: 'fail', message: 'Booking does not exist' })
    // };

    // CHECK FOR THE CORRECT USER
    const user = await pool.query(`SELECT * FROM bookings WHERE user_id = $1`, [user_id]);

    if (user.rows.length === 0) {
      return res.json({ status: 'fail', message: `This user didn't create the booking` })
    };

    
    const updateBooking = await pool.query(`UPDATE bookings AS b SET court_id = $1, booking_date = $2, time_in = $3, time_out = $4 WHERE booking_id = $5 RETURNING *`, [court_id, booking_date, time_in, time_out, bookingId]);

    res.json({ status: "success", message: `Booking ${bookingId} updated successfully!` });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Update Booking Error');
  }
};

module.exports = { getUsers, getUserByEmail, createBooking, updateBooking };