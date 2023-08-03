const sequelize = require('../config/connection.js');
const { User, Review, Comment, Song, Rating } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const commentData = require('./commentData.json');
const songData = require('./songData.json');
const ratingData = require('./ratingData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const ratings = await Rating.bulkCreate(ratingData);

  for (const song of songData) {
    await Song.create({
      ...song,
    });
  }

  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      rating_id: ratings[Math.floor(Math.random() * ratings.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const rating of ratingData) {
    await Rating.create({
      ...rating,
    });
  }

  process.exit(0);
};

seedDatabase();