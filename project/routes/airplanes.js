const express = require('express');
const router = express.Router();
const Airplane = require('../models/Airplane');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const airplanes = await Airplane.find();
    res.json(airplanes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:AirplaneID', async (req, res) => {
  try {
    const airplane = await Airplane.findOne({ AirplaneID: req.params.AirplaneID });
    if (!airplane) {
      return res.status(404).json({ error: 'Airplane not found' });
    }
    res.json(airplane);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newAirplane = new Airplane(req.body);
    const savedAirplane = await newAirplane.save();
    res.json(savedAirplane);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:AirplaneID', async (req, res) => {
  try {
    const airplaneId = req.params.AirplaneID;
    const updatedData = req.body; 
    
    const updatedAirplane = await Airplane.findOneAndUpdate({ AirplaneID: airplaneId }, updatedData, { new: true });
    if (!updatedAirplane) {
      return res.status(404).json({ error: 'Airplane not found' });
    }
    res.json(updatedAirplane);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedAirplane = await Airplane.findOneAndDelete({ AirplaneID: req.params.id });
    if (!deletedAirplane) {
      return res.status(404).json({ error: 'Airplane not found' });
    }
    res.json({ message: 'Airplane deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;