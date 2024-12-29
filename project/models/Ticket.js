const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
    TicketID: Number,
    Seat_number: Number,
    Status: String
  });
  module.exports = mongoose.model('Ticket', TicketSchema);