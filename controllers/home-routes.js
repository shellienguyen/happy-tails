//contanin all of the user-facing routes such as homepage and login page
const router = require('express').Router();
const session = require('express-session');
const sequelize = require('../config/connection');
const { Canine, Volunteer, Kennel, Demeanor } = require('../models');



module.exports = router;