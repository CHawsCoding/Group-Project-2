const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Song extends Model {}

Song.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'song',
  }
);

//gets average rating for a song
Song.prototype.averageRating = async function () {
  const reviews = await this.getReviews();
  const ratings = await Promise.all(reviews.map((review) => Rating.findByPk(review.rating_id)));
  const sumOfRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return sumOfRatings / ratings.length;
};

module.exports = Song;
