const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  bookId: {
    type: String,
    required: true
  },
  bookTitle: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userScore: {
    type: Number,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  textContent: {
    type: String,
    required: true
  }
});

const Review = model('Review', reviewSchema);
module.exports = Review;