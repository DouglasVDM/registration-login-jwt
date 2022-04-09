const pool = require('./db');
const authorization = require('./middleware/authorization');


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
router.post('/bookings', async (req, res) => {
  try {
    // 1. DESTRUCTURE req.body
    const {
      user_id,
      court_id,
      booking_date,
      time_in,
      time_out } = req.body;

    // 2. CHECK IF BOOKING EXIST (IF BOOKING EXIST THEN THROW ERROR)
    // const booking = await pool.query('SELECT * FROM bookings WHERE (court_id, booking_date, time_in, time_out) = ($1, $2, $3, $4)', [court_id, booking_date, time_in, time_out]);

    // if (booking.rows.length !== 0) {
    //   return res.json({ status: 'fail', message: 'Booking already exist' })
    // };

    // 3 CHECK IF USER HAS BOOKED A COURT FOR THE WEEK
    // const user = await pool.getUserById;

    // if (user.rows.length !== 0) {
    //   return res.json({ status: 'fail', message: 'User only allowed 1 booking per week' })
    // };

    // 4, ENTER THE NEW BOOKING INSIDE OUR DATABASE
    const newBooking = await pool.query('INSERT INTO bookings (user_id, court_id, booking_date, time_in, time_out) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user_id, court_id, booking_date, time_in, time_out]);

    res.json({ status: "success", message: 'Booking created', bookings: newBooking });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Add Booking Error');
  }
});


module.exports = {
  checkUserEmail,
  registerUser,
  getUserById,
  checkAdminEmail,
  registerAdmin,
  getAdminById,
};