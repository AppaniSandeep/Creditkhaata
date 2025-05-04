const express = require('express');
const Loan = require('../models/Loan');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const loan = new Loan({ ...req.body, userId: req.userId, balance: req.body.amount });
    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const loans = await Loan.find({ userId: req.userId }).populate('customerId');
  res.json(loans);
});

router.put('/:id/status', async (req, res) => {
  try {
    const loan = await Loan.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status: req.body.status },
      { new: true }
    );
    res.json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
