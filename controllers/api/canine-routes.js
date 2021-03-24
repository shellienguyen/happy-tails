const router = require('express').Router();
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');

const { Canine, Volunteer, Kennel, Demeanor } = require('../../models');

//get all canine
router.get('/', (req, res) => {
    Canine.findAll({
        include:[
            { model: Volunteer,
            attributes:['username']}
            // {model:Kennel,
            // attributes:['k_name']}
        ]
    }).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    // Canine.findAll({
    //     attributes: [
    //         'c_id', 
    //         'c_name', 
    //         'c_demeanor', 
    //         'has_walked_am', 
    //         'has_walked_pm', 
    //         'has_potty_am', 
    //         'has_potty_pm', 
    //         'k_id',
    //     ],
    //     include: [{
    //         model: Volunteer,
    //         attributes: ['username']
    //     }]
    // })
    //     .then(dbCanineData => {
    //         console.log('router.get inside home-routes.js');
    //         res.json(dbCanineData);

    //     })
    //     .catch(err => {
    //         console.log("Error in router.get in home-route.js");
    //         console.log(err);
    //         res.status(500).json(err);
    //     });
});

//get canine by id
router.get('/:c_id', (req, res) => {
    Canine.findOne({
        where: {
            c_id: req.params.c_id
        },
        attributes: ['c_id', 'c_name', 'c_demeanor', 'has_walked_am', 'has_walked_pm', 'has_potty_am', 'has_potty_pm', 'k_id'],
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

//delete a dog won't be actviated as volunteers don't have access to delete

module.exports = router;
