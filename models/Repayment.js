const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
  amount: Number,
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Repayment', repaymentSchema);