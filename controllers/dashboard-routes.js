const router = require('express').Router();
const sequelize = require('../config/connection');
const { Canine, Volunteer, Kennel, Demeanor } = require('../models');
const withAuth = require('../utils/auth');
const shift_change = require('../utils/helpers');

router.get('/', withAuth, (req, res) => {
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
            const canine = {
                canine: dbCanineData.map((canine) => canine.get({ plain: true })),
                shift: shift_change()
            };
            res.render("homepage", { canine });
            // res.json(dbCanineData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
})

router.get('/edit/id')

module.exports = router;