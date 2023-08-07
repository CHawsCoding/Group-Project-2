const router = require("express").Router();
const { Review, User, Song } = require("../models");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login"); // Redirects user to the login page if not authenticated
};

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [{ model: User }, { model: Song }],
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id, // Add user ID from session
      song_id : 1,
    });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const updatedReview = await Review.update(req.body, {
      where: { id: req.params.id, user_id: req.user.id }, // Add user ID check
    });
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const deletedReview = await Review.destroy({
      where: { id: req.params.id, user_id: req.user.id }, // Add user ID check
    });
    res.status(200).json(deletedReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;