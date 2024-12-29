const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    ReviewID: Number,
    Rating: Number,
    Comment: String,
    Date: Date
  });
  module.exports = mongoose.model('Review', ReviewSchema);