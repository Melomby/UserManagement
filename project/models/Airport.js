const mongoose = require('mongoose');
const AirportSchema = new mongoose.Schema({
    AirportID: Number,
    Name: String,
    IATA_Code: String
  });
  module.exports = mongoose.model('Airport', AirportSchema);