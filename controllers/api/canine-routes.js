const router = require('express').Router();
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');
const nodemailer = require('nodemailer'); //package to send emails


const { Canine, Volunteer, Kennel, Demeanor } = require('../../models');
const { get } = require('../dashboard-routes');

//transporter function for node mailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

//nodemailer mail option
let mailOptions = {
    from: 'happywaggytailsbootcamp2021@gmail.com',
    to: 'happywaggytailsbootcamp2021@gmail.com',
    subject: 'Dog activity tracked',
    text: 'A volunteer has taken care of this dog'

}
let walkAlert = () => {
    //nodemailer function
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email Sent!!!');
        }
    });
}

//get all canine
router.get('/', (req, res) => {
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
            'k_id'
        ],
        include: [
            {
                model: Volunteer,
                attributes: ['v_id', 'username']
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
    }).then(data => {
        console.log(data);
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
                model: Kennel,
                attributes: ['k_name']
            },
            {
                model: Demeanor,
                attributes: ['d_desc']
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

// get all dogs for dashboard based on difficulty level
router.get('/d/:c_demeaner', (req, res) => {
console.log('$$$$$$$$$$$$$$$$$$$$$$$$$');
console(req.params.c_demeanor);
console.log('$$$$$$$$$$$$$$$$$$$$$$$$$');
    Canine.findAll({
        where: { c_demeanor: req.params.c_demeanor },
        order: [['c_name', 'ASC']],
        attributes: [
            'c_id',
            'c_name',
            'c_demeanor',
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)'), 'has_walked_pm'],
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)'), 'has_potty_am'],
            [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)'), 'has_potty_pm'],
            'k_id'
        ],
        include: [
            {
                model: Volunteer,
                attributes: ['v_id', 'username']
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
    }).then(data => {
        console.log(data);
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


//update dog
router.put('/:c_id', (req, res) => {
    Canine.update(
        // {

        //     has_walked_am: req.body.has_walked_am,
        //     has_walked_pm: req.body.has_walked_pm,
        //     has_potty_am: req.body.has_potty_am,
        //     has_potty_pm: req.body.has_potty_pm
        // },
        req.body,
        {
            where: {
                c_id: req.params.c_id
            }

        })
        .then(dbCanineData => {
            return res.json(dbCanineData);
            // 
            // res.redirect('/dashboard')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});


// create put route for to update

//delete a dog won't be actviated as volunteers don't have access to delete

module.exports = router;
