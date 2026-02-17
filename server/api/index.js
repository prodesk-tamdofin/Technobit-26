require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Connect to MongoDB
connectDB();

// CORS
const whitelist = (process.env.REMOTE_CLIENT_APP || 'http://localhost:3000').split(',');
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/uploads', express.static(__dirname + '/uploads'));

// Middlewares
app.use(express.json());
app.use(cookieParser('secret'));

// Routers
const clientRouter = require('../routers/clientsSimple');

app.use('/api/client', clientRouter);

// Health check for Vercel
app.get('/', (req, res) => {
  res.json({ message: 'Technobit 26 API - Running on Vercel' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Technobit 26 API' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    succeed: false,
    msg: err.message || 'Something went wrong',
  });
});

// For Vercel serverless
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
