const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:PaymentID', (req, res) => {
  const paymentId = req.params.PaymentID; 
  Payment.findOne({ PaymentID: paymentId }) 
    .then(payment => res.json(payment))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.json(savedPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:PaymentID', (req, res) => {
  const paymentId = req.params.PaymentID;
  const updatedData = req.body;
  
  Payment.findOneAndUpdate({ PaymentID: paymentId }, updatedData, { new: true })
    .then(updatedPayment => res.json(updatedPayment))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPayment = await Payment.findOneAndDelete({ PaymentID: req.params.id });
    if (!deletedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;