require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('../config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Connect to MongoDB (async, will retry on failed requests)
connectDB().catch(err => console.error('Initial DB connection failed:', err));

// CORS - allow multiple origins
const whitelist = (process.env.REMOTE_CLIENT_APP || 'http://localhost:3000').split(',').map(url => url.trim());
console.log('CORS whitelist:', whitelist);

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Request origin:', origin);
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }
    // Check if origin is in whitelist
    if (whitelist.some(allowed => origin === allowed || origin.includes(allowed.replace('https://', '').replace('http://', '')))) {
      callback(null, true);
    } else {
      console.log('CORS rejected origin:', origin, 'Whitelist:', whitelist);
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
};

// Handle preflight requests
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use('/uploads', express.static(__dirname + '/uploads'));

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser('secret'));

// Routers
const clientRouter = require('../routers/clientsSimple');
const adminRouter = require('../routers/adminSimple');
const adActionRouter = require('../routers/adActionSimple');

app.use('/api/client', clientRouter);
app.use('/api/admin', adminRouter);
app.use('/api/adAction', adActionRouter);

// Health check for Vercel
app.get('/', (req, res) => {
  res.json({ message: 'Technobit 26 API - Running on Vercel', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Technobit 26 API', timestamp: new Date().toISOString() });
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Error handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`, err);
  res.status(err.status || err.statusCode || 500).json({
    succeed: false,
    msg: err.message || 'Something went wrong',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    succeed: false,
    msg: 'Endpoint not found',
  });
});

// For Vercel serverless
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`));
}
