const withAuth = (req, res, next) => {
    if (!req.session.v_id) {
      res.redirect('/login');
    }
    else {
      next();
    }
  };
  
  module.exports = withAuth;