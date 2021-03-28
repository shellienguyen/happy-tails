const router = require('express').Router();
const sequelize = require('../config/connection');
const { Canine, Volunteer, Kennel, Demeanor } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
   Canine.findAll({
      where: { c_id: req.body.c_id },
      attributes: ['c_id',
                   'c_name', 
                   'c_demeanor', 
                   'has_walked_am', 
                   'has_walked_pm',
                   'has_potty_am',
                   'has_potty_pm' ],
      include: [{
         model: Volunteer,
         attributes: ['v_username'],
      }]
   })
   .then(dbCanineData => {
      /* const canines = dbCanineData.map(post => post.get({ plain: true }));
      res.render('dashboard', { canines, loggedIn: true }); */
      console.log('inside dashboard-routes.js');
      res.json(dbCanineData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});


router.get('/edit/:id', withAuth, (req, res) => {

})

module.exports = router;