const mongoose = require('mongoose');
const LocationSchema = new mongoose.Schema({
    locID: Number,
    City: String,
    Country: String
  });
  module.exports = mongoose.model('Location', LocationSchema);