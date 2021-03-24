const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Demeanor, Canine } = require('../../models');

//get all demeanor
router.get('/', (req, res) => {
    Demeanor.findAll({
        include:[
            { model: Canine,
            attributes:['c_name']
        }]
    }).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


module.exports = router;