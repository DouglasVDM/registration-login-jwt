const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

// REGISTERING
router.post('/register', validInfo, async (req, res) => {
  try {
    // 1. DESTRUCTURE req.body (name, email, passsword)
    const { name, email, password } = req.body;

    // 2. CHECK IF USER EXIST (IF USER EXIST THEN THROW ERROR)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (user.rows.length !== 0) {
      return res.status(401).json('User already exist')
    }

    // 3. bcrypt THE USER PASSWORD
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4, ENTER THE NEW USER INSIDE OUR DATABASE
    const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [name, email, bcryptPassword]
    );

    // 5. GENERATE THE JWT TOKEN
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// LOGIN
router.post('/login', validInfo, async (req, res) => {
  try {
    // 1. DESTRUCTURE THE req.body
    const { email, password } = req.body;

    // 2. CHECK IF USER DOESN'T EXIST (IF NOT THEN THROW ERROR)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(401).json('Password or Email is incorrect');
    }

    // 3. CHECK IF INCOMMING PASSWORD IS THE SAME AS THE DATABASE PASSWORD
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      return res.status(401).json('Password or Email is incorrect');
    }

    // 4. GIVE THEM THE TOKEN
    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

router.get('/is-verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');    
  }
});

module.exports = router;