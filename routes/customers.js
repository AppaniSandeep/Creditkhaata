const express = require('express');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const customer = new Customer({ ...req.body, userId: req.userId });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const customers = await Customer.find({ userId: req.userId });
  res.json(customers);
});

router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Customer.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Customer deleted' });
});

module.exports = router;