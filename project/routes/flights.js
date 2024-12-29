const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:FlightID', (req, res) => {
  const flightId = req.params.FlightID;
  Flight.findOne({ FlightID: flightId })
    .then(flight => res.json(flight))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    const savedFlight = await newFlight.save();
    res.json(savedFlight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:FlightID', (req, res) => {
  const flightId = req.params.FlightID;
  const updatedData = req.body;
  
  Flight.findOneAndUpdate({ FlightID: flightId }, updatedData, { new: true })
    .then(updatedFlight => res.json(updatedFlight))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedFlight = await Flight.findOneAndDelete({ FlightID: req.params.id });
    if (!deletedFlight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json({ message: 'Flight deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;