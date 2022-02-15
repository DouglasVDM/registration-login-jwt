module.exports = function (req, res, next) {
  const {
    user_name,
    user_email,
    user_password,
    admin_name,
    admin_email,
    admin_password,
} = req.body;


  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === '/user/register') {
    if (![user_name, user_email, user_password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validEmail(user_email)) {
      return res.status(401).json('Invalid Email');
    }
  } else if (req.path === '/user/login') {
    if (![user_email, user_password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validEmail(user_email)) {
      return res.status(401).json('Invalid Email')
    }
  }

  if (req.path === "/admin/register") {
    if (![admin_email, admin_name, admin_password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(admin_email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/admin/login") {
    if (![admin_email, admin_password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(admin_email)) {
      return res.status(401).json("Invalid Email");
    }
  }
  next();
};