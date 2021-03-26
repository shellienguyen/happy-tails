const router = require('express').Router();
const sequelize = require('../config/connection');
const { Canine, Volunteer, Kennel, Demeanor } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {

})

router.get('/edit/id')

module.exports = router;