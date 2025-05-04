const express = require('express');
const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/summary', async (req, res) => {
  const loans = await Loan.find({ userId: req.userId });
  const totalLoaned = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalCollected = loans.reduce((sum, loan) => sum + (loan.amount - loan.balance), 0);
  const overdueAmount = loans
    .filter(l => l.status === 'overdue')
    .reduce((sum, loan) => sum + loan.balance, 0);

  const repayments = await Repayment.find({ userId: req.userId });
  const avgRepaymentTime = repayments.length > 0 ? 
    repayments.reduce((sum, r) => sum + ((new Date(r.date) - new Date(r.createdAt)) / (1000 * 60 * 60 * 24)), 0) / repayments.length
    : 0;

  res.json({ totalLoaned, totalCollected, overdueAmount, avgRepaymentTime: avgRepaymentTime.toFixed(2) });
});

router.get('/overdue', async (req, res) => {
  const overdueLoans = await Loan.find({ userId: req.userId, status: 'overdue' }).populate('customerId');
  const customers = overdueLoans.map(loan => ({
    customer: loan.customerId.name,
    phone: loan.customerId.phone,
    loanId: loan._id,
    dueDate: loan.dueDate,
    balance: loan.balance
  }));
  res.json(customers);
});

module.exports = router;