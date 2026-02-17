const express = require('express');
const router = express.Router();
const {
  adminLogin,
  adminAuth,
  adminLogout,
} = require('../controllers/adminSimple');

router.post('/login', adminLogin);
router.get('/auth', adminAuth);
router.post('/logout', adminLogout);

module.exports = router;
