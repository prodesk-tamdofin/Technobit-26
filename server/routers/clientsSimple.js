const express = require('express');
const router = express.Router();
const { verify } = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

// Strict limiter only for sensitive auth endpoints (login, register, password reset)
const authLimiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { succeed: false, msg: 'Too many attempts. Please wait and try again.' },
});
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
	adminUpdateParticipant,
	getRefCodeStats,
	adminBackupParticipants,
} = require('../controllers/clientsSimple');

// Auth middleware to verify JWT token
// Checks both httpOnly cookie (standard) and Authorization header (fallback for
// browsers that block third-party cookies, e.g. Safari, Firefox, Brave)
const authMiddleware = (req, res, next) => {
	let token = req.cookies?.token;

	// Fallback: Authorization: Bearer <token> header
	if (!token) {
		const authHeader = req.headers['authorization'];
		if (authHeader && authHeader.startsWith('Bearer ')) {
			token = authHeader.slice(7);
		}
	}

	if (!token) {
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
router.post('/reg/par', authLimiter, registration);

// Login routes
router.post('/login', authLimiter, login);
router.post('/login/par', authLimiter, login);

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
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password-otp', authLimiter, resetPasswordWithOTP);

// Event capacity (public — used by frontend to show slot availability)
router.get('/event-capacity/:slug', getEventCapacity);

// Admin: update any participant field
router.patch('/admin/participant/:id', adminUpdateParticipant);

// Admin: reference code usage stats
router.get('/admin/refcode-stats', getRefCodeStats);

// Admin: full JSON backup
router.get('/admin/backup', adminBackupParticipants);

module.exports = router;
