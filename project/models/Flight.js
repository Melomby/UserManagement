const mongoose = require('mongoose');
const FlightSchema = new mongoose.Schema({
    FlightID: Number,
    DepartureTime: Date,
    ArrivalTime: Date,
    Status: String
  });
  module.exports = mongoose.model('Flight', FlightSchema);