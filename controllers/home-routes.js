//contanin all of the user-facing routes such as homepage and login page
const router = require('express').Router();
const session = require('express-session');
const sequelize = require('../config/connection');
const { Canine, Volunteer, Kennel, Demeanor } = require('../models');
const { Op } = require('sequelize');

// get all dogs for homepage
router.get("/", (req, res) => {
        Canine.findAll({
        order: [['c_name', 'ASC']],
        attributes: [
            'c_id',
            'c_name',
            'c_demeanor',
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)'), 'has_walked_pm'],
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)'), 'has_potty_am'],
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)'), 'has_potty_pm'],
            'k_id'],
        include: [
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

            if (!req.session.loggedIn) {
                req.session.loggedIn = false;
            };

            res.render("homepage", { canine, loggedIn: req.session.loggedIn });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        const todaysDateIsoString = new Date().toISOString().split('T')[0];

        Canine.findOne(
            {attributes: [[sequelize.fn('max', sequelize.col('updated_at')), 'maxDate']],}
        )
        .then (dbUpdateAtDate => {
            const dbUpdateAtDatejson = JSON.stringify(dbUpdateAtDate);
            const tmpDate = dbUpdateAtDatejson.split('"')[3];
            const lastUpdatedAtDateJson = tmpDate.split('T')[0];

            if (lastUpdatedAtDateJson != todaysDateIsoString) {
                console.log("not equal");
                Canine.update({
                    has_walked_am: null,
                    has_walked_pm: null,
                    has_potty_am: null,
                    has_potty_pm: null
                },
                { where: {c_id: {[Op.gt]: 0}}})
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

        res.redirect('/dashboard');
        return;
    }

    res.render('login-signup');
});

// logout route
router.get('/logout', (req, res) => {
    req.session.loggedIn = false;
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
            {
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
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('sign-up');
});

module.exports = router;