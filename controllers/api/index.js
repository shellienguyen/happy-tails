const router = require('express').Router();

const canineRoutes = require('./canine-routes');

router.use('canine', canineRoutes);

module.exports = router;