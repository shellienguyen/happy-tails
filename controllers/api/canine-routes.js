const router = require('express').Router();
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');

const { Canine, Volunteer, Kennel, Demeanor } = require('../../models');

//get all canine
router.get('/', (req, res) => {
    Canine.findAll({
        attributes: [
                    'c_id', 
                    'c_name', 
                    'c_demeanor', 
                    // [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
                     
                    'has_walked_pm', 
                    'has_potty_am', 
                    'has_potty_pm', 
                    'k_id'
                ],
        include:[
            { model: Volunteer,
            attributes:['v_id','username'],
            through: {attributes: []},
            },
            {model:Kennel,
            attributes:['k_name']},
            {
                model: Demeanor,
                attributes:['d_desc']
            }
        ]
    }).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
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
                attributes: [ 'k_name']
            },
            {
                model: Demeanor,
                attributes:['d_desc']
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
