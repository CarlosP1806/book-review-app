const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  bookId: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  userScore: Number,
  textContent: String
});

const Review = model('Review', reviewSchema);
module.exports = Review;