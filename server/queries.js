
// Student queries
const checkUserEmail = "SELECT * FROM users WHERE user_email = $1";

const SignUpUser = "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *";

const getUserById = "SELECT * FROM users WHERE user_id = $1";

// Mentor queries
// const checkMentorEmail = "SELECT * FROM mentors WHERE mentor_email = $1";

// const SignUpMentor = "INSERT INTO mentors (mentor_name, mentor_email, mentor_password) VALUES ($1, $2, $3) RETURNING *";

// const getMentorById = "SELECT mentor_name FROM mentors WHERE mentor_id = $1";


// Admin queries
const checkAdminEmail = "SELECT * FROM admin WHERE admin_email = $1";

const SignUpAdmin = "INSERT INTO admin (admin_name, admin_email, admin_password) VALUES ($1, $2, $3) RETURNING *";

const getAdminById = "SELECT admin_name FROM admin WHERE admin_id = $1";


module.exports = {
  checkUserEmail,
  SignUpUser,
  getUserById,
  // checkMentorEmail,
  // SignUpMentor,
  // getMentorById,
  checkAdminEmail,
  SignUpAdmin,
  getAdminById,
};
