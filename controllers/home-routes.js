//contanin all of the user-facing routes such as homepage and login page
const router = require('express').Router();
const session = require('express-session');
const sequelize = require('../config/connection');
const { Canine, Volunteer, Kennel, Demeanor } = require('../models');


// get all dogs for homepage
router.get("/", (req, res) => {
    Canine.findAll({
        attributes: [
        'c_id', 
        'c_name', 
        'c_demeanor', 
        [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
        [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)'), 'has_walked_pm'],
        [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)'), 'has_potty_am'],
        [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)'), 'has_potty_pm'],
        'k_id'],
        include:[
            { 
            model: Volunteer, 
                      attributes: ['username']
            },
            {
                model: Demeanor,
                attributes: ['d_desc']
            },
            {
                model: Kennel,
                attributes: ['k_name']
            }
        ]

    })
        .then((dbCanineData) => {
            const canine = dbCanineData.map((canine) => canine.get({ plain: true }));
            res.render("homepage", { canine });
            // res.json(dbCanineData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login-signup');
});
// get single dog  
router.get('/:c_id', (req, res) => {
    Canine.findOne({
        where: {
            c_id: req.params.c_id
        },
        attributes: [
            'c_id',
            'c_name',
            'c_demeanor',
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)'), 'has_walked_pm'],
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)'), 'has_potty_am'],
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)'), 'has_potty_pm'],
            'k_id',
        ],
        include: [
            { */
                /* model: Volunteer,
                attributes: ['c_id', 'c_name', 'c_demeanor', 'has_walked_am', 'has_walked_pm', 'has_potty_am', 'has_potty_pm', 'k_id'],
                include: {
                    model: Volunteer,
                    attributes: ['username']
                } */
                 /* 
                model: Volunteer,
                attributes: ['username']
                
            },
            {
                model: Kennel,
                attributes: ['k_name']
            },
            {
                model: Demeanor,
                attributes: ['d_desc']
            }
        ]
    })
        .then(dbCanineData => {
            if (!dbCanineData) {
                res.status(404).json({ message: 'No Canine found with that id' });
                return;
            }

            const canine = dbCanineData.get({ plain: true });

            res.render('single-canine', {
                canine,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); */



router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('sign-up');
});



module.exports = router;







