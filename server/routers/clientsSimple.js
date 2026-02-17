const express = require('express');
const router = express.Router();
const {
	registration,
	login,
	logout,
	getUser,
	getAllParticipants,
	getParticipantsCount,
} = require('../controllers/clientsSimple');

// Registration route
router.post('/reg/par', registration);

// Login routes
router.post('/login', login);
router.post('/login/par', login);

// Logout route
router.post('/logout', logout);

// Get user data (protected route would need auth middleware)
router.get('/user', getUser);

// Admin: participants list and count
router.post('/getAll/:eventValue', getAllParticipants);
router.get('/parCount/:eventValue', getParticipantsCount);

module.exports = router;
