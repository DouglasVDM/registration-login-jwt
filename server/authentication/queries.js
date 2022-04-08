
// USER QUERIES
const checkUserEmail = "SELECT * FROM users WHERE user_email = $1";

const registerUser = "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *";

const getUserById = "SELECT user_name FROM users WHERE user_id = $1";


// Admin queries
const checkAdminEmail = "SELECT * FROM admin WHERE admin_email = $1";

const registerAdmin = "INSERT INTO admin (admin_name, admin_email, admin_password) VALUES ($1, $2, $3) RETURNING *";

const getAdminById = "SELECT admin_name FROM admin WHERE admin_id = $1";


module.exports = {
  checkUserEmail,
  registerUser,
  getUserById,
  checkAdminEmail,
  registerAdmin,
  getAdminById,
};