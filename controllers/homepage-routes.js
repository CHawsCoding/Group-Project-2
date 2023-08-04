const router = require('express').Router();
const { Review, User, Song, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
      // Get all reviews and JOIN with user data
      const reviewData = await Review.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
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

module.exports = router;