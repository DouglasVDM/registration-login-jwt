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


// ADD NEW BOOKING
router.post('/booking', async (req, res) => {
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


// ALL BOOKINGS FOR COURT 1 BY DATE DESCENDING
router.get('/date', async (req, res) => {
  try {
    const dateAsc = await pool.query('SELECT booking_date FROM bookings AS b INNER JOIN courts AS c ON b.court_id = c.court_id INNER JOIN users AS u ON b.user_id = u.user_id WHERE c.court_id = 1 ORDER BY booking_date ASC');

    res.json(dateAsc.rows);
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server error - Dashboard/dateAsc')
  }
});


// ALL BOOKINGS FOR COURT 1 BY TIME DESCENDING
router.get('/time-in', async (req, res) => {
  try {
    const timeIn = await pool.query('SELECT time_in FROM bookings AS b INNER JOIN courts AS c ON b.court_id = c.court_id INNER JOIN users AS u ON b.user_id = u.user_id WHERE c.court_id = 1 ORDER BY time_in ASC');

    res.json(timeIn.rows);
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server error - Dashboard/timeIn')
  }
});

module.exports = router;