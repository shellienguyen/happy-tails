const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Kennel, Canine } = require('../../models');

//get all kennels via /api/kennel endpoint
router.get('/', (req, res) => {
    Kennel.findAll({
        includes:[{
            model:Canine,
            attributes:['c_name']
        }]
    })
        .then(kennelData => {
            console.log('router.get inside home-routes.js');
            res.json(kennelData)
        })   
        .catch(err => {
            res.status(500).json(err);
        })
});

//get kennel by id to find which dogs are in said kennel id
router.get('/:k_id', (req, res) => {
    Kennel.findOne({
        where: {
            k_id:req.params.k_id
        },
        includes:[
            {
            model:Canine,
            attributes: ['c_name', 'c_id']
        }]
    })
        .then(kennelData => {
            res.json(kennelData)
        })   
        .catch(err => {
            res.status(500).json(err);
        })
});

module.exports = router;