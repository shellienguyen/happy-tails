//contanin all of the user-facing routes such as homepage and login page
const router = require('express').Router();
const session = require('express-session');
const sequelize = require('../config/connection');
const { Canine, Volunteer, Kennel, Demeanor } = require('../models');


// get all dogs for homepage
router.get("/", (req, res) => {
    Canine.findAll({
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
    ], 
      
    })
    .then((dbCanineData) => {
        const canine = dbCanineData.map((canine) => canine.get({ plain: true }));
        // res.render("dashboard", { canine });
        res.json(dbCanineData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
});




// get single dog  
// router.get('/:c_id', (req, res) => {
//     Canine.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: [
//                     'c_id', 
//                     'c_name', 
//                     'c_demeanor', 
//                     'has_walked_am', 
//                     'has_walked_pm', 
//                     'has_potty_am', 
//                     'has_potty_pm', 
//                     'k_id',
//         ],
//         include: [
//             {
//                 model: Volunteer,
//                 attributes: ['c_id', 'c_name', 'c_demeanor', 'has_walked_am', 'has_walked_pm', 'has_potty_am', 'has_potty_pm', 'k_id'],
//                 include: {
//                     model: Kennel,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: Kennel,
//                 attributes: ['username']
//             }
//         ]
//     })
//     .then(dbCanineData => {
//         if (!dbCanineData) {
//             res.status(404).json({ message: 'No Canine found with that id' });
//             return;
//         }

//         const canine = dbCanineData.get({ plain: true });

//         res.render('single-canine', {
//             canine,
//             loggedIn: req.session.loggedIn
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect('/dashboard');
//       return;
//     }
  
//     res.render('login');
//   });
  
//   router.get('/signup', (req, res) => {
//       if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//       }
    
//       res.render('sign-up');
//     });



module.exports = router;