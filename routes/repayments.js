const express = require('express');
const Repayment = require('../models/Repayment');
const Loan = require('../models/Loan');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const { loanId, amount, date } = req.body;
    const loan = await Loan.findOne({ _id: loanId, userId: req.userId });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    const repayment = new Repayment({ userId: req.userId, loanId, amount, date });
    await repayment.save();

    loan.balance -= amount;
    if (loan.balance <= 0) {
      loan.balance = 0;
      loan.status = 'paid';
    }
    await loan.save();

    res.status(201).json({ repayment, updatedLoan: loan });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:loanId', async (req, res) => {
  const repayments = await Repayment.find({ loanId: req.params.loanId, userId: req.userId });
  res.json(repayments);
});

module.exports = router;
