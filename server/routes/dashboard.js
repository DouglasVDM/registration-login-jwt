const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');


router.get('/', authorization, async (req, res) => {
  try {
    // req.user HAS THE PAYLOAD
    // res.json(req.user);

    const user = await pool.query('SELECT user_name FROM users WHERE user_id = $1', [req.user]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error - Dashboard');
  }
});


// GET ALL BOOKINGS
router.get('/bookings', async (req, res) => {
  try {

    const bookings = await pool.query(`SELECT * FROM bookings AS b ORDER BY booking_id ASC`);

    res.json(bookings.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server GET AllBookings Error');
  }
});


// GET BOOKINGS BY COURT ID
router.get('/bookings/:courtId', async (req, res) => {
  try {
    // 1. DESTRUCTURE req.body
    const { courtId } = req.params;

    // 2. CHECK IF BOOKING EXIST (IF BOOKING EXIST THEN THROW ERROR)
    const booking = await pool.query(`SELECT booking_date, time_in, time_out FROM bookings AS b INNER JOIN courts AS c ON b.court_id = c.court_id WHERE b.court_id = ${courtId}`);

    res.json(booking.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server GET BookingByCourtId Error');
  }
});


// GET BOOKINGS BY USER ID
router.get('/bookings/:userId', async (req, res) => {
  try {
    // 1. DESTRUCTURE req.body
    const { userId } = req.params;

    // 2. CHECK IF BOOKING EXIST (IF BOOKING EXIST THEN THROW ERROR)
    const booking = await pool.query(`SELECT booking_id, booking_date, time_in, time_out FROM bookings AS b INNER JOIN users AS u ON b.user_id = u.user_id WHERE b.user_id = ${userId} ORDER BY booking_date ASC`);

    res.json(booking.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server GET BookingByPlayerId Error');
  }
});


// ALL BOOKINGS FOR COURT 1 BY DATE ASCENDING
router.get('/date', async (req, res) => {
  try {
    const dateAsc = await pool.query('SELECT booking_date FROM bookings AS b INNER JOIN courts AS c ON b.court_id = c.court_id INNER JOIN users AS u ON b.user_id = u.user_id WHERE c.court_id = 1 ORDER BY booking_date ASC');

    res.json(dateAsc.rows);
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server error - Dashboard/dateAsc')
  }
});


// ALL BOOKINGS FOR COURT 1 BY TIME ASCENDING
router.get('/time-in', async (req, res) => {
  try {
    const timeIn = await pool.query('SELECT time_in FROM bookings AS b INNER JOIN courts AS c ON b.court_id = c.court_id INNER JOIN users AS u ON b.user_id = u.user_id WHERE c.court_id = 1 ORDER BY time_in ASC');

    res.json(timeIn.rows);
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server error - Dashboard/timeIn')
  }
});




// ALL COURTS
router.get('/courts', async (req, res) => {
  try {
    const court = await pool.query('SELECT court_id, court_name FROM courts AS c ORDER BY court_name ASC');

    res.json(court.rows);
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server error - Dashboard/court')
  }
});


module.exports = router;