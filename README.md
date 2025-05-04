# CrediKhaata – Loan Tracker for Shopkeepers

CrediKhaata is a RESTful backend service built using *Node.js, **Express, and **MongoDB* that allows shopkeepers to:

* Manage customers
* Record credit sales (loans)
* Track repayments
* Receive alerts for overdue payments
* Generate receipts and mock SMS reminders

## 🌐 Features

### 1. User Authentication

* Register/Login via email and password
* JWT-based session management
* User-scoped routes

### 2. Customer Management

* Add, edit, delete customers
* Fields: name, phone, address, trust score (0–10), credit limit

### 3. Loan Management

* Create loans with item, amount, issue date, due date, frequency
* Optional: interest %, grace period
* Track loan status: pending, paid, overdue

### 4. Repayment Tracking

* Record repayments (partial or full)
* Auto-balance updates

### 5. Summaries & Alerts

* /summary: total loaned, collected, overdue, avg repayment time
* /overdue: customers with overdue loans

### 6. Bonus Features

* Mock SMS/WhatsApp reminders
* PDF receipt generation for repayments
* Webhook endpoint for external repayment notifications

---

## 🚀 Getting Started

### 1. Clone and Install

bash
git clone https://github.com/yourusername/credikhaata-backend.git
cd credikhaata
npm install


### 2. Create .env File

env
PORT=5000
MONGO_URI=mongodb://localhost:27017/credikhaata
JWT_SECRET=your_jwt_secret


### 3. Start Server

bash
node index.js


---

## 📂 Project Structure


.
├── models/           # Mongoose schemas
├── routes/           # Express route handlers
├── middleware/       # Auth middleware
├── receipts/         # Generated PDF receipts
├── .env              # Environment variables
├── server.js         # App entry point


---

## 🔑 API Routes Summary

| Route                              | Method              | Description             |
| ---------------------------------- | ------------------- | ----------------------- |
| /api/auth/register               | POST                | Register shopkeeper     |
| /api/auth/login                  | POST                | Login                   |
| /api/customers/                  | GET/POST/PUT/DELETE | Customer CRUD           |
| /api/loans/                      | GET/POST            | Create/View loans       |
| /api/repayments/                 | POST                | Record repayment        |
| /api/summary                     | GET                 | Shopkeeper loan summary |
| /api/overdue                     | GET                 | List overdue loans      |
| /api/extras/send-reminder        | POST                | Mock SMS reminder       |
| /api/extras/receipt/:repaymentId | GET                 | Download repayment PDF  |
| /api/extras/webhook/repayment    | POST                | Webhook endpoint        |

---

## 🔧 Dependencies

* express
* mongoose
* jsonwebtoken
* bcryptjs
* dotenv
* cors
* pdfkit
* moment / date-fns

---

## 📌 Notes

* PDF receipts are saved to /receipts and streamed to the client on request.
* SMS reminder and webhook endpoints are mocked for demonstration purposes.

