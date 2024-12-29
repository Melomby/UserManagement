const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema({
    OrderID: Number,
    Order_Date: Date,
    Total_Amount: Number
  });
  module.exports = mongoose.model('Reservation', ReservationSchema);