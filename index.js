const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const loanRoutes = require('./routes/loans');
const repaymentRoutes = require('./routes/repayments');
const summaryRoutes = require('./routes/summary');


const app = express()

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDb Connected"));

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/repayments', repaymentRoutes);
app.use('/api', summaryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
