const withAuth = (req, res, next) => {
    if (!req.session.v_id) {
      res.redirect('/login-signup');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;