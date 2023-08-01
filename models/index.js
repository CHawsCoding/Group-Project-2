const User = require('./user');
const Review = require('./review');
const Comment = require('./comment');
const Song = require('./song');

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Review, {
  foreignKey: 'review_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(Song, {
    foreignKey: 'song_id',
});

Song.hasMany(Review, {
    foreignKey: 'song_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Review, Comment, Song };