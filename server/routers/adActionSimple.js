const express = require('express');
const router = express.Router();
const { getSettings } = require('../controllers/adActionSimple');

router.get('/setting', getSettings);

module.exports = router;
