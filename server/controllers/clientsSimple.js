const Participant = require('../models/Participant');
const { hashSync, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const registration = async (req, res) => {
  try {
    const { fullName, roll, college, email, phone, className, institute, address, fb, password, userName } = req.body;

    // Check if user exists
    const existingUser = await Participant.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.status(400).json({
        succeed: false,
        msg: existingUser.email === email ? 'Email already registered!' : 'Username already taken!',
      });
    }

    // Hash password
    const hashedPassword = hashSync(password, 10);

    // Generate unique QR code
    const qrCode = `TECH26-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`.toUpperCase();

    // Create participant
    const newParticipant = await Participant.create({
      qrCode,
      fullName,
      roll,
      college,
      email,
      phone,
      className,
      institute,
      address: address || 'N/A',
      fb: fb || null,
      image: '',
      userName,
      password: hashedPassword,
    });

    res.status(201).json({
      succeed: true,
      msg: 'Congratulations!! Your registration is successful.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      succeed: false,
      msg: error.message || 'Registration failed',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        succeed: false,
        msg: 'Email or Password should not be empty.',
      });
    }

    const user = await Participant.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        succeed: false,
        msg: `${email} does not exist`,
      });
    }

    const isMatch = await compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        succeed: false,
        msg: 'Wrong email and password combination.',
      });
    }

    const tokenPayload = {
      id: user._id,
      userName: user.userName,
      mode: 'par',
    };

    const token = sign(tokenPayload, process.env.CLIENT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: 'none',
      signed: true,
    });

    res.json({
      succeed: true,
      msg: `Successfully logged in as ${user.fullName}`,
      username: user.userName,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      succeed: false,
      msg: 'Login failed',
    });
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.json({
    succeed: true,
    msg: 'Successfully logged out.',
  });
};

const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    
    const user = await Participant.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        succeed: false,
        msg: 'User not found',
      });
    }

    // Return format that frontend expects
    res.json({
      succeed: true,
      result: user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      succeed: false,
      msg: 'Failed to get user data',
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { fullName, phone, whatsapp, fb, section, address } = req.body;

    const user = await Participant.findById(id);
    if (!user) {
      return res.status(404).json({
        succeed: false,
        msg: 'User not found',
      });
    }

    // Update allowed fields
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (whatsapp !== undefined) user.whatsapp = whatsapp;
    if (fb !== undefined) user.fb = fb;
    if (section !== undefined) user.section = section;
    if (address) user.address = address;

    await user.save();

    res.json({
      succeed: true,
      msg: 'Profile updated successfully',
      user: {
        fullName: user.fullName,
        phone: user.phone,
        whatsapp: user.whatsapp,
        fb: user.fb,
        section: user.section,
        address: user.address,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      succeed: false,
      msg: 'Failed to update profile',
    });
  }
};

// Register for a segment/event with gaming data
const registerForSegment = async (req, res) => {
  try {
    const { id } = req.user;
    const { eventName, bkashNumber, transactionId, gamingData } = req.body;

    if (!eventName) {
      return res.status(400).json({
        succeed: false,
        msg: 'Event name is required',
      });
    }

    const user = await Participant.findById(id);
    if (!user) {
      return res.status(404).json({
        succeed: false,
        msg: 'User not found',
      });
    }

    // Check if already registered
    if (user.registeredEvents.includes(eventName)) {
      return res.status(400).json({
        succeed: false,
        msg: 'You are already registered for this event',
      });
    }

    // Define paid events and their fees
    const paidEvents = {
      'crack-the-code': 30,
      'efootball': 40,
      'pubg-mobile': 50,
      'free-fire': 50,
    };

    // Check if paid event
    if (paidEvents[eventName]) {
      if (!bkashNumber || !transactionId) {
        return res.status(400).json({
          succeed: false,
          msg: 'bKash number and transaction ID are required for paid events',
        });
      }

      // Store payment info
      if (!user.paymentInfo) {
        user.paymentInfo = new Map();
      }
      user.paymentInfo.set(eventName, {
        bkashNumber,
        transactionId,
        verified: false,
        fee: paidEvents[eventName],
      });
    }

    // Store gaming-specific data
    if (gamingData) {
      if (!user.gamingData) {
        user.gamingData = new Map();
      }
      user.gamingData.set(eventName, gamingData);
    }

    // Add event to registered events
    user.registeredEvents.push(eventName);
    await user.save();

    res.json({
      succeed: true,
      msg: `Successfully registered for ${eventName}!`,
      registeredEvents: user.registeredEvents,
    });
  } catch (error) {
    console.error('Register for segment error:', error);
    res.status(500).json({
      succeed: false,
      msg: 'Failed to register for event',
    });
  }
};

// Verify payment for a participant's segment
const verifyPayment = async (req, res) => {
  try {
    const { participantId, eventName, segment, verified } = req.body;
    const segmentKey = eventName || segment; // Support both naming conventions

    const participant = await Participant.findById(participantId);
    if (!participant) {
      return res.status(404).json({
        succeed: false,
        msg: 'Participant not found',
      });
    }

    if (!participant.paymentInfo || !participant.paymentInfo.get(segmentKey)) {
      return res.status(400).json({
        succeed: false,
        msg: 'No payment info found for this segment',
      });
    }

    const paymentData = participant.paymentInfo.get(segmentKey);
    paymentData.verified = verified;
    participant.paymentInfo.set(segmentKey, paymentData);
    await participant.save();

    res.json({
      succeed: true,
      msg: `Payment ${verified ? 'verified' : 'unverified'} successfully`,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      succeed: false,
      msg: 'Failed to verify payment',
    });
  }
};

const getAllParticipants = async (req, res) => {
  try {
    const { skip = 0, rowNum = 50, searchKey = '' } = req.body || {};
    const query = {};

    if (searchKey && String(searchKey).trim().length > 0) {
      const regex = new RegExp(searchKey, 'i');
      query.$or = [
        { fullName: regex },
        { email: regex },
        { phone: regex },
        { userName: regex },
        { roll: regex },
        { college: regex },
      ];
    }

    const participants = await Participant.find(query)
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(rowNum))
      .lean();

    return res.json(participants);
  } catch (error) {
    console.error('Get participants error:', error);
    return res.status(500).json({
      succeed: false,
      msg: 'Failed to load participants.',
    });
  }
};

const getParticipantsCount = async (req, res) => {
  try {
    const { searchKey = '' } = req.query || {};
    const query = {};

    if (searchKey && String(searchKey).trim().length > 0) {
      const regex = new RegExp(searchKey, 'i');
      query.$or = [
        { fullName: regex },
        { email: regex },
        { phone: regex },
        { userName: regex },
        { roll: regex },
        { college: regex },
      ];
    }

    const total = await Participant.countDocuments(query);
    return res.json(total);
  } catch (error) {
    console.error('Count participants error:', error);
    return res.status(500).json({
      succeed: false,
      msg: 'Failed to count participants.',
    });
  }
};

// Admin: Delete a participant by ID
const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    
    const participant = await Participant.findById(id);
    if (!participant) {
      return res.status(404).json({
        succeed: false,
        msg: 'Participant not found',
      });
    }
    
    await Participant.findByIdAndDelete(id);
    
    return res.json({
      succeed: true,
      msg: 'Participant deleted successfully',
    });
  } catch (error) {
    console.error('Delete participant error:', error);
    return res.status(500).json({
      succeed: false,
      msg: 'Failed to delete participant.',
    });
  }
};

// Admin: Remove a segment registration from participant
const removeSegmentRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { segment } = req.body;
    
    if (!segment) {
      return res.status(400).json({
        succeed: false,
        msg: 'Segment value is required',
      });
    }
    
    const participant = await Participant.findById(id);
    if (!participant) {
      return res.status(404).json({
        succeed: false,
        msg: 'Participant not found',
      });
    }
    
    // Remove segment from registeredEvents array
    participant.registeredEvents = participant.registeredEvents.filter(
      (event) => event !== segment
    );
    
    await participant.save();
    
    return res.json({
      succeed: true,
      msg: `Removed ${segment} registration successfully`,
      registeredEvents: participant.registeredEvents,
    });
  } catch (error) {
    console.error('Remove segment error:', error);
    return res.status(500).json({
      succeed: false,
      msg: 'Failed to remove segment registration.',
    });
  }
};

// Admin: Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalParticipants = await Participant.countDocuments();
    
    // Count registrations by segment
    const segmentCounts = await Participant.aggregate([
      { $unwind: '$registeredEvents' },
      { $group: { _id: '$registeredEvents', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Recent registrations (last 10)
    const recentRegistrations = await Participant.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('fullName email registeredEvents createdAt')
      .lean();
    
    return res.json({
      succeed: true,
      stats: {
        totalParticipants,
        segmentCounts: segmentCounts.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        recentRegistrations,
      },
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return res.status(500).json({
      succeed: false,
      msg: 'Failed to get dashboard stats.',
    });
  }
};

// Admin: Clear all participant data
const clearAllParticipants = async (req, res) => {
  try {
    const result = await Participant.deleteMany({});
    
    return res.json({
      succeed: true,
      msg: `Deleted ${result.deletedCount} participants`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Clear participants error:', error);
    return res.status(500).json({
      succeed: false,
      msg: 'Failed to clear participants.',
    });
  }
};

module.exports = {
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
};
