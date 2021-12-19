const router = require('express').Router();
const homeRoutes = require('./home/home_routes');

router.use('/', homeRoutes);

module.exports = router;