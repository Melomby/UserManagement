const express = require('express');
const router = express.Router();
const Airport = require('../models/Airport');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const airports = await Airport.find();
    res.json(airports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:AirportID', (req, res) => {
  const airportId = req.params.AirportID;
  Airport.findOne({ AirportID: airportId })
    .then(airport => res.json(airport))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', async (req, res) => {
  try {
    const newAirport = new Airport(req.body);
    const savedAirport = await newAirport.save();
    res.json(savedAirport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:AirportID', (req, res) => {
  const airportId = req.params.AirportID;
  const updatedData = req.body; 
  
  Airport.findOneAndUpdate({ AirportID: airportId }, updatedData, { new: true })
    .then(updatedAirport => res.json(updatedAirport))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedAirport = await Airport.findOneAndDelete({ AirportID: req.params.id });
    if (!deletedAirport) {
      return res.status(404).json({ error: 'Airport not found' });
    }
    res.json({ message: 'Airport deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;