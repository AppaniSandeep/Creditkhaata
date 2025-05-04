const express = require('express');
const PDFDocument = require('pdfkit');
const auth = require('../middleware/auth');
const Repayment = require('../models/Repayment');
const Loan = require('../models/Loan');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.use(auth);

// Mock SMS/WhatsApp Reminder API
router.post('/send-reminder', async (req, res) => {
  const { phone, message } = req.body;
  console.log(`Sending reminder to ${phone}: ${message}`);
  res.json({ success: true, message: 'Reminder sent (mocked).' });
});

// Generate PDF Receipt for Repayment
router.get('/receipt/:repaymentId', async (req, res) => {
  try {
    const repayment = await Repayment.findOne({ _id: req.params.repaymentId, userId: req.userId }).populate('loanId');
    if (!repayment) return res.status(404).json({ error: 'Repayment not found' });

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../receipts/receipt-${repayment._id}.pdf`);
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(18).text('CrediKhaata - Repayment Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Date: ${new Date(repayment.date).toLocaleDateString()}`);
    doc.text(`Amount: ₹${repayment.amount}`);
    doc.text(`Loan ID: ${repayment.loanId._id}`);
    doc.text(`Item: ${repayment.loanId.item}`);
    doc.end();

    stream.on('finish', () => {
      res.download(filePath);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Webhook to notify external service on repayment (mocked)
router.post('/webhook/repayment', async (req, res) => {
  const { loanId, amount, date } = req.body;
  console.log(`Webhook received for repayment: Loan ${loanId}, Amount ₹${amount}, Date: ${date}`);
  res.json({ received: true });
});

module.exports = router;
