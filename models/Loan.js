const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  item: String,
  amount: Number,
  issueDate: Date,
  dueDate: Date,
  frequency: { type: String, enum: ['bi-weekly', 'monthly'] },
  interest: Number,
  graceDays: Number,
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
  balance: Number,
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);