const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
    PaymentID: Number,
    Stripe_Payment: String,
    Payment_date: Date,
    Amount: Number,
    Status: String,
    Payment_method: String,
    Currency: String
  });
  module.exports = mongoose.model('Payment', PaymentSchema);