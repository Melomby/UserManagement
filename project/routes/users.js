const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:UserID', (req, res) => {
  const userId = req.params.UserID; 
  User.findOne({ UserID: userId })
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:UserID', (req, res) => {
  const userId = req.params.UserID;
  const updatedData = req.body;
  
  User.findOneAndUpdate({ UserID: userId }, updatedData, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ UserID: req.params.id });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;