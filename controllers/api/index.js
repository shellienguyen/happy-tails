const router = require('express').Router();
const canineRoutes = require('./canine-routes');
const kennelRoutes = require('./kennel-routes');
const volunteerRoutes = require('./volunteer-routes')
const demeanorRoutes = require('./demeanor-routes')

router.use('/canine', canineRoutes);
router.use('/kennel', kennelRoutes);
router.use('/volunteer', volunteerRoutes);
router.use('/demeanor', demeanorRoutes);

module.exports = router;