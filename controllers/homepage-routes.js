const router = require('express').Router();
const { Review, User, Song, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
      // Get all reviews and JOIN with user data
      const reviewData = await Review.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const reviews = reviewData.map((review) => review.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        reviews, 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/newReview', async (req, res) => {
    try {
        res.render('newreview');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;