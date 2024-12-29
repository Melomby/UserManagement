const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:OrderID', (req, res) => {
  const orderId = req.params.OrderID; 
  Reservation.findOne({ OrderID: orderId })
    .then(reservation => res.json(reservation))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.json(savedReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:OrderID', (req, res) => {
  const orderId = req.params.OrderID;
  const updatedData = req.body; 
  
  Reservation.findOneAndUpdate({ OrderID: orderId }, updatedData, { new: true })
    .then(updatedReservation => res.json(updatedReservation))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedReservation = await Reservation.findOneAndDelete({ OrderID: req.params.id });
    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
