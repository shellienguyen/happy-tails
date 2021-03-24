const router = require('express').Router();
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');
const { Volunteer } = require('../../models');

//get all volunteers
router.get('/', (req, res) => {
    Volunteer.findAll({
        attributes: {
            exclude: ['password']
        }
    })
        .then(volunteerData = res.json(volunteerData))
        .catch(err => {
            res.status(500).json(err);
        })
});

module.exports = router;