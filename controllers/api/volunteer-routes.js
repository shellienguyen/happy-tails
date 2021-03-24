const router = require('express').Router();
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');
const { Volunteer } = require('../../models');

//get all volunteers via /api/volunteer endpoint
router.get('/', (req, res) => {
    Volunteer.findAll({
        attributes: {
            exclude: ['password']
        }
    })
        .then(volunteerData => {
            console.log('router.get inside home-routes.js');
            res.json(volunteerData)
        })   
        .catch(err => {
            res.status(500).json(err);
        })
});

//get volunteer by id
router.get('/:v_id', (req, res) => {
    Volunteer.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            v_id: req.params.v_id
        }
    })
        .then(volunteerData => {
            console.log('router.get inside home-routes.js');
            res.json(volunteerData)
        })   
        .catch(err => {
            res.status(500).json(err);
        })
});

//Create a new volunteer 
router.post('/', (req, res) => {
    Volunteer.create({
        username:req.body.username,
        password:req.body.password
    })
    .then(volunteerData => {

    })
})


module.exports = router;