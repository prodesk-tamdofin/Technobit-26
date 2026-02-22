const express = require('express');
const router = express.Router();
const { verify } = require('jsonwebtoken');
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
	getFullSingle,
	downloadGroupCSV,
	forgotPassword,
	resetPasswordWithOTP,
	getEventCapacity,
} = require('../controllers/clientsSimple');

// Auth middleware to verify JWT token
const authMiddleware = (req, res, next) => {
	const token = req.cookies?.token;
	
	if (!token) {
		console.log('No token found in cookies');
		return res.json({
			succeed: false,
			msg: 'Not logged in',
		});
	}
	
	try {
		const decoded = verify(token, process.env.CLIENT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		console.log('Token verification failed:', err.message);
		return res.json({
			succeed: false,
			msg: 'Invalid or expired token',
		});
	}
};

// Registration route
router.post('/reg/par', registration);

// Login routes
router.post('/login', login);
router.post('/login/par', login);

// Logout route
router.post('/logout', logout);

// Get user data (protected route)
router.get('/user', authMiddleware, getUser);
router.get('/getClient', authMiddleware, getUser);

// Get full participant data by username (public route)
router.get('/fullSingle/:username', getFullSingle);

// Update profile (protected)
router.post('/update-profile', authMiddleware, updateProfile);
router.put('/profile', authMiddleware, updateProfile);
router.patch('/editProfile', authMiddleware, updateProfile);

// Segment registration (protected)
router.post('/singlePart', authMiddleware, registerForSegment);
router.post('/segment/register', authMiddleware, registerForSegment);

// Admin: participants list and count
router.post('/getAll/:eventValue', getAllParticipants);
router.get('/parCount/:eventValue', getParticipantsCount);

// Admin: participant management
router.delete('/participant/:id', deleteParticipant);
router.post('/participant/:id/remove-segment', removeSegmentRegistration);
router.post('/verify-payment', verifyPayment);
router.get('/dashboard-stats', getDashboardStats);
router.delete('/clear-all', clearAllParticipants);

// Admin: CSV download by group
router.get('/download-csv/:group', downloadGroupCSV);

// Password reset via OTP email (public routes)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password-otp', resetPasswordWithOTP);

// Event capacity (public — used by frontend to show slot availability)
router.get('/event-capacity/:slug', getEventCapacity);

module.exports = router;
