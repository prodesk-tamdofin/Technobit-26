const express = require('express');
const router = express.Router();
const { registration, login, logout, getUser } = require('../controllers/clientsSimple');

// Registration route
router.post('/reg/par', registration);

// Login route
router.post('/login/par', login);

// Logout route
router.post('/logout', logout);

// Get user data (protected route would need auth middleware)
router.get('/user', getUser);

module.exports = router;
