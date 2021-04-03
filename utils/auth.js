// Login authentication.  Redirect to the login page if user is not logged in
const withAuth = (req, res, next) => {
  if (!req.session.v_id) {
    res.redirect('/login');
  }
  else {
    next();
  };
};

module.exports = withAuth;