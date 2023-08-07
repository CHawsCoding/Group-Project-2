const router = require('express').Router();
const userRoutes = require('./user-routes');
const homepageRoutes = require('./homepage-routes');
const reviewRoutes = require('./review-routes');
const songRoutes = require('./song-routes');

// router.use('/comments', commentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/songs', songRoutes);
router.use('/', homepageRoutes);
router.use('/users', userRoutes);

module.exports = router;
