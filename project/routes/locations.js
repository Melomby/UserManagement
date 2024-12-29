const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:locID', (req, res) => {
  const locationId = req.params.locID; 
  Location.findOne({ locID: locationId }) 
    .then(location => res.json(location))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    const savedLocation = await newLocation.save();
    res.json(savedLocation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:locID', (req, res) => {
  const locationId = req.params.locID;
  const updatedData = req.body;
  
  Location.findOneAndUpdate({ locID: locationId }, updatedData, { new: true })
    .then(updatedLocation => res.json(updatedLocation))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedLocation = await Location.findOneAndDelete({ locID: req.params.id });
    if (!deletedLocation) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json({ message: 'Location deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
