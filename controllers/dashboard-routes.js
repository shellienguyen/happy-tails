const router = require("express").Router();
const sequelize = require("../config/connection");
const { Canine, Volunteer, Kennel, Demeanor } = require("../models");
const withAuth = require("../utils/auth");
const { Op } = require('sequelize');

// get all dogs for dashboard
router.get("/", withAuth, (req, res) => {
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
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', {
      canine,
      loggedIn: req.session.loggedIn
    })
  })
  .catch(err => {
    console.log(err);
  });
});

// get all dogs for dashboard based on difficulty level
router.get('/d/:c_demeanor', (req, res) => {
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
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', {
      canine,
      loggedIn: req.session.loggedIn
    })
  })
  .catch(err => {
    console.log(err);
  });
});

// get single dog
router.get("/edit/:c_id", (req, res) => {
  Canine.findOne(
    {
      where: { c_id: req.params.c_id },
    },
    {
      attributes: [
        "c_id",
        "c_name",
        "c_demeanor",
        [
          sequelize.literal(
            "(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)"
          ),
          "has_walked_am",
        ],
        [
          sequelize.literal(
            "(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)"
          ),
          "has_walked_pm",
        ],
        [
          sequelize.literal(
            "(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)"
          ),
          "has_potty_am",
        ],
        [
          sequelize.literal(
            "(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)"
          ),
          "has_potty_pm",
        ],
        "k_id",
      ],
      include: [
        {
          model: Volunteer,
          attributes: [
            "c_id",
            "c_name",
            "c_demeanor",
            "has_walked_am",
            "has_walked_pm",
            "has_potty_am",
            "has_potty_pm",
            "k_id",
            "body",
          ],
          include: {
            model: Volunteer,
            attributes: ["username"],
          },
        },
        {
          model: Kennel,
          attributes: ["k_name"],
        },
        {
          model: Demeanor,
          attributes: ["d_desc"],
        },
      ],
  })
  .then((dbCanineData) => {
    console.log(dbCanineData);
    if (dbCanineData) {
      const canine = dbCanineData.get({ plain: true });

      res.render("single-dog", {
        canine,
        loggedIn: true,
        username: req.session.username,
        v_id: req.session.v_id
      });
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

// AM: Get all dogs for the dashboard that still need to be walked
router.get('/f/needWalkAM', (req, res) => {
  Canine.findAll({
    where: { has_walked_am: null },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)'), 'has_potty_am'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// PM: Get all dogs for the dashboard that still need to be walked
router.get('/f/needWalkPM', (req, res) => {
  Canine.findAll({
    where: { has_walked_pm: null },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)'), 'has_walked_pm'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)'), 'has_potty_pm'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// AM: Get all dogs for the dashboard that still need potty
router.get('/f/needPottyAM', (req, res) => {
  Canine.findAll({
    where: { has_potty_am: null },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)'), 'has_potty_am'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// PM: Get all dogs for the dashboard that still need potty
router.get('/f/needPottyPM', (req, res) => {
  Canine.findAll({
    where: { has_potty_pm: null },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)'), 'has_walked_pm'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)'), 'has_potty_pm'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// AM: Get all dogs for dashboard that have already walked
router.get('/f/haveWalkedAM', (req, res) => {
  Canine.findAll({
    where: { has_walked_am: { [Op.not]: null } },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)'), 'has_potty_am'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// PM: Get all dogs for dashboard that have already walked
router.get('/f/haveWalkedPM', (req, res) => {
  Canine.findAll({
    where: { has_walked_pm: { [Op.not]: null } },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)'), 'has_walked_pm'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)'), 'has_potty_pm'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// AM: Get all dogs for dashboard that have already had their potty
router.get('/f/havePottyAM', (req, res) => {
  Canine.findAll({
    where: { has_potty_am: { [Op.not]: null } },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)'), 'has_potty_am'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// PM: Get all dogs for dashboard that have already had their potty
router.get('/f/havePottyPM', (req, res) => {
  Canine.findAll({
    where: { has_potty_pm: { [Op.not]: null } },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)'), 'has_walked_pm'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)'), 'has_potty_pm'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// AM: Get all dogs for dashboard that have already had their potty and have walked
router.get('/f/allHappyAM', (req, res) => {
  Canine.findAll({
    where: {
      has_potty_am: { [Op.not]: null },
      [Op.and]: { has_walked_am: { [Op.not]: null } }
    },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)'), 'has_potty_am'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// PM: Get all dogs for dashboard that have already had their potty and have walked
router.get('/f/allHappyPM', (req, res) => {
  Canine.findAll({
    where: {
      has_potty_pm: { [Op.not]: null },
      [Op.and]: { has_walked_pm: { [Op.not]: null } }
    },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)'), 'has_walked_pm'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)'), 'has_potty_pm'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// AM: Get all dogs for dashboard that still need either a walk, a potty, or both
router.get('/f/allSadAM', (req, res) => {
  Canine.findAll({
    where: { [Op.or]: [{ has_potty_am: null }, { has_walked_am: null }] },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_am)'), 'has_walked_am'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_am)'), 'has_potty_am'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

// PM: Get all dogs for dashboard that still need either a walk, a potty, or both
router.get('/f/allSadPM', (req, res) => {
  Canine.findAll({
    where: { [Op.or]: [{ has_potty_pm: null }, { has_walked_pm: null }] },
    order: [['c_name', 'ASC']],
    attributes: [ 'c_id', 'c_name', 'c_demeanor',
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_walked_pm)'), 'has_walked_pm'],
      [sequelize.literal('(SELECT volunteer.username FROM volunteer WHERE volunteer.v_id = canine.has_potty_pm)'), 'has_potty_pm'],
      'k_id'],
    include: [
      { model: Volunteer, attributes: ['username']},
      { model: Demeanor, attributes: ['d_desc']},
      { model: Kennel, attributes: ['k_name']} ]
  })
  .then(dbCanineData => {
    const canine = dbCanineData.map(canine => canine.get({ plain: true }));
    res.render('dashboard', { canine, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
  });
});

module.exports = router;