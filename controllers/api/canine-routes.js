const router = require('express').Router();
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');

const { Canine, Volunteer, Kennel } = require('../../models');

//get all dogs
router.get('/', (req, res) => {
    Canine.findAll({
        attributes: ['c_id', 'd_name', 'c_demeanor', 'has_walked_am', 'has_walked_pm', 'has_potty_am', 'has_potty_pm', 'k_id']
    })
        .then(dbCanineData => {
            console.log('router.get inside home-routes.js');
            res.json(dbCanineData);

        })
        .catch(err => {
            console.log("Error in router.get in home-route.js");
            console.log(err);
            res.status(500).json(err);
        });
});

//get dog by id
router.get('/:c_id', (req, res) => {
    Canine.findOne({
        where: {
            c_id: req.params.c_id
        },
        attributes: ['c_id', 'd_name', 'c_demeanor', 'has_walked_am', 'has_walked_pm', 'has_potty_am', 'has_potty_pm', 'k_id'],
        include: [
            {
                model: Volunteer,
                attributes: ['username']
            },
            {
                model: Kennel,
                attributes: ['k_id', 'k_name']
            }

        ]
    }).then(dbCanineData => {
        res.json(dbCanineData);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

//update dog
router.get('/:c_id', (req, res) => {
    Canine.update(
        {
            has_walked_am: req.body.has_walked_am,
            has_walked_pm: req.body.has_walked_pm,
            has_potty_am: req.body.has_potty_am,
            has_potty_pm: req.body.has_potty_pm
        },
        {
            where: {
                c_id: req.params.c_id
            }

        })
        .then(dbCanineData => {
            res.json(dbCanineData);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

module.exports = router;
