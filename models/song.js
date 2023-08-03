const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

console.log("1");

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
  const Review = require('./review');
  console.log(this.id);
  const reviews = await Review.findAll({where: {song_id : this.id}})
  const ratings = reviews.map((review) => review.rating);
  const sumOfRatings = ratings.reduce((acc, rating) => acc + rating, 0);
  console.log(ratings);
  console.log(sumOfRatings);
  return sumOfRatings / ratings.length;
};

module.exports = Song;
