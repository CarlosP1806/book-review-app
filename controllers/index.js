const router = require('express').Router();
const homeRoutes = require('./home/home_routes');
const userRoutes = require('./user/user_routes');

router.use('/', homeRoutes);
router.use('/user', userRoutes);

module.exports = router;