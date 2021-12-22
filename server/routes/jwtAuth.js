const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

// REGISTERING
router.post('/register', async (req, res) => {
  try {
    // 1. DESTRUCTURE req.body (name, email, passsword)
    const { name, email, password } = req.body;

    // 2. CHECK IF USER EXIST (IF USER EXIST THEN THROW ERROR)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (user.rows.length !== 0) {
      return res.status(401).send('User already exist')
    };

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

module.exports = router;