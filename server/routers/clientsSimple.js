const express = require('express');
const router = express.Router();
const {
	registration,
	login,
	logout,
	getUser,
	updateProfile,
	registerForSegment,
	verifyPayment,
	getAllParticipants,
	getParticipantsCount,
	deleteParticipant,
	removeSegmentRegistration,
	getDashboardStats,
	clearAllParticipants,
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

// Update profile
router.post('/update-profile', updateProfile);
router.put('/profile', updateProfile);

// Segment registration (for logged-in participants)
router.post('/singlePart', registerForSegment);
router.post('/segment/register', registerForSegment);

// Admin: participants list and count
router.post('/getAll/:eventValue', getAllParticipants);
router.get('/parCount/:eventValue', getParticipantsCount);

// Admin: participant management
router.delete('/participant/:id', deleteParticipant);
router.post('/participant/:id/remove-segment', removeSegmentRegistration);
router.post('/verify-payment', verifyPayment);
router.get('/dashboard-stats', getDashboardStats);
router.delete('/clear-all', clearAllParticipants);

module.exports = router;
