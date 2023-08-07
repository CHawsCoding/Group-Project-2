const router = require("express").Router();
const { Review, User, Song } = require("../models");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login"); 
};


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
  
  async function findMostRecentSong() {
    try {
      const mostRecentSong = await Song.findOne({
        order: [["id", "DESC"]],
      });

      return mostRecentSong.id;
    } catch (error) {
      console.error("Error finding most recent item:", error);
      throw error;
    }
  }

  const mostRecentSongId = await findMostRecentSong(); 

  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id, 
      song_id: mostRecentSongId,
    });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const updatedReview = await Review.update(req.body, {
      where: { id: req.params.id, user_id: req.user.id }, 
    });
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/editreview/:id", ensureAuthenticated, async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [{ model: User }, { model: Song }],
    });

    if (!review) {
      return res.status(404).send("Review not found");
    }

    
    res.render("editreview", { review: review.get() });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/editreview/:id", ensureAuthenticated, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const updatedReview = await Review.update(
      { review_title: title, content: content },
      {
        where: { id, user_id: req.user.id },
      }
    );

    if (updatedReview[0] === 0) {
      return res.status(404).json({
        message:
          "Review not found or you do not have permission to edit this review.",
      });
    }

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
