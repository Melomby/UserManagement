const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:ReviewID', (req, res) => {
  const reviewId = req.params.ReviewID; 
  Review.findOne({ ReviewID: reviewId }) 
    .then(review => res.json(review))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:ReviewID', (req, res) => {
  const reviewId = req.params.ReviewID;
  const updatedData = req.body;
  Review.findOneAndUpdate({ ReviewID: reviewId }, updatedData, { new: true })
    .then(updatedReview => res.json(updatedReview))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findOneAndDelete({ ReviewID: req.params.id });
    if (!deletedReview) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;