const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:TicketID', (req, res) => {
  const ticketId = req.params.TicketID;
  Ticket.findOne({ TicketID: ticketId }) 
    .then(ticket => res.json(ticket))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    const savedTicket = await newTicket.save();
    res.json(savedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:TicketID', (req, res) => {
  const ticketId = req.params.TicketID;
  const updatedData = req.body; 
  
  Ticket.findOneAndUpdate({ TicketID: ticketId }, updatedData, { new: true })
    .then(updatedTicket => res.json(updatedTicket))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTicket = await Ticket.findOneAndDelete({ TicketID: req.params.id });
    if (!deletedTicket) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;