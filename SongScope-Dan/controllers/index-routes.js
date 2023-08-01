const router = require('express').Router();
const userRoutes = require('./userRoutes');


router.use('/comments', commentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/songs', songRoutes);
router.use('/users', userRoutes);

module.exports = router;
