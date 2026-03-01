require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
app.set('trust proxy', 1); // needed for express-rate-limit behind codespace/vercel proxy
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

var RateLimit = require('express-rate-limit');

// Anti-DDoS: 120 requests per 15 minutes per IP
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { succeed: false, msg: 'Too many requests. Please try again later.' },
});

// Stricter limiter for auth endpoints
var authLimiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { succeed: false, msg: 'Too many attempts. Please wait and try again.' },
});

// Configuration
cloudinary.config({
  cloud_name: process.env.UPLOAD_NAME,
  api_key: process.env.UPLOAD_KEY,
  api_secret: process.env.UPLOAD_SECRET, // Click 'View API Keys' above to copy your API secret
});

//cors
const whitelist = process.env.REMOTE_CLIENT_APP.split(',');
console.log(whitelist);
const corOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corOptions));

app.use('/uploads', express.static(__dirname + '/uploads'));
//middlewares
app.use(express.json());
app.use(cookieParser('secret'));
app.use(limiter);
//routers
const adminRouter = require('./routers/admin');
const galleryRouter = require('./routers/gallery');
const eventsRouter = require('./routers/events');
const adminActionRouter = require('./routers/adminAction');
const qrScannerRouter = require('./routers/qrScanner');
const contactRouter = require('./routers/contact');
const noticeRouter = require('./routers/notices');
const clientRouter = require('./routers/clients');
const faqRouter = require('./routers/faq');
const sponsorRouter = require('./routers/Sponsors');
const prizeRouter = require('./routers/prize');

app.use('/api/admin', adminRouter);
app.use('/api/admin/gallery', galleryRouter);
app.use('/api/events', eventsRouter);
app.use('/api/adAction', adminActionRouter);
app.use('/api/qr', qrScannerRouter);
app.use('/api/contact', contactRouter);
app.use('/api/notice', noticeRouter);
app.use('/api/client', clientRouter);
app.use('/api/faq', faqRouter);
app.use('/api/sponsor', sponsorRouter);
app.use('/api/prize', prizeRouter);
//notfound and errors
const errorHandlerMiddleWare = require('./middlewares/errorHandler');
const notFoundMiddleWare = require('./middlewares/notFound');
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

//ports and start
const PORT = process.env.PORT || 8001;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}...`);
  });
};
startServer();
