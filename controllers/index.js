const router = require('express').Router();
const homeRoutes = require('./home/home_routes');
const userRoutes = require('./user/user_routes');
const reviewRoutes = require('./review/review_routes');

router.use('/', homeRoutes);
router.use('/user', userRoutes);
router.use('/review', reviewRoutes);

module.exports = router;