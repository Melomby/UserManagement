const mongoose = require('mongoose');
const AirplaneSchema = new mongoose.Schema({
    AirplaneID: Number,
    Name: String,
    Capacity: Number
  });
  module.exports = mongoose.model('Airplane', AirplaneSchema);