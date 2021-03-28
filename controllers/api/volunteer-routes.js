const router = require('express').Router();
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');
const { Volunteer } = require('../../models');

//endpoints for volunteer inclode /volunteer, /volunteer/id, /volunteer/login, /volunteer/logout

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
        v_fname: req.body.v_fname,
        v_lname: req.body.v_lname,
        username:req.body.username,
        password:req.body.password
    })
    .then(volunteerData => {
        res.session.save(()=> {
        req.session.v_id = volunteerData.v_id;
        req.session.username = volunteerData.username;
        req.session.loggedIn = true;
        res.json(volunteerData);
    });

    });
});

//login end point for volunteer
router.post('/login', (req,res) => {
    Volunteer.findOne({
        where: { username: req.body.username }
    })
    .then(volunteerData => {
        if(!volunteerData) {
            res.status(400).json({message: 'That username does not exist!'});
            return;
        } ;
        
        const validPassword = volunteerData.checkPassword(req.body.password);
        
        if(!validPassword){
            res.status(400).json({message: 'Incorrect password!'});
            return;
        };

        req.session.save(()=>{
            req.session.v_id = volunteerData.v_id;
            req.session.username = volunteerData.username;
            req.session.loggedIn = true;
            res.json({user: volunteerData, message: 'You are now logged in!'});
        });
    });
});

//nogout route
router.post('/logout', (req,res) => {
    if(req.session.loggedIn){
        req.session.destroy(()=> {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});


module.exports = router;