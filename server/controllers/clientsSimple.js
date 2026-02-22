const Participant = require('../models/Participant');
const { hashSync, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const registration = async (req, res) => {
  try {
    const { fullName, roll, college, email, phone, className, institute, address, fb, password, userName, section } = req.body;

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

    // Always use bottts style (robot/gender-neutral) for avatars
    const avatarSeed = `${userName}-${Date.now()}`;
    const randomAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}`;

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
      section: section || null,
      fb: fb || null,
      image: randomAvatar,
      userName,
      password: hashedPassword,
    });

    // Send registration confirmation email (fire-and-forget, don't block response)
    const firstName = fullName ? fullName.split(' ')[0] : 'Participant';
    const instituteLabel = institute === 'BMARPC'
      ? 'Birshreshtha Munshi Abdur Rouf Public College (BMARPC)'
      : 'Birshreshtha Noor Mohammad Public College (BNMPC)';
    resend.emails.send({
      from: `Technobit'26 — BNMPC IT Club <${process.env.SERVER_EMAIL}>`,
      to: [email],
      subject: `Registration Confirmed — Technobit'26`,
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a14;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a14;padding:40px 0;">
    <tr><td align="center">
      <table width="540" cellpadding="0" cellspacing="0" style="background:#11111f;border-radius:16px;border:1px solid #2a2a4a;overflow:hidden;max-width:540px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#4f2d8a,#7c3aed,#6d28d9);padding:36px 40px;text-align:center;">
            <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:4px;color:#c4b5fd;text-transform:uppercase;">BNMPC IT Club Presents</p>
            <h1 style="margin:0;font-size:34px;font-weight:800;color:#ffffff;letter-spacing:2px;">TECHNOBIT'26</h1>
            <p style="margin:10px 0 0 0;font-size:13px;color:#ddd6fe;">technobit26-itc.tech</p>
          </td>
        </tr>

        <!-- Success Badge -->
        <tr>
          <td align="center" style="padding:28px 40px 0;">
            <div style="display:inline-block;background:#16a34a22;border:1px solid #16a34a55;border-radius:100px;padding:8px 20px;">
              <span style="color:#4ade80;font-size:13px;font-weight:600;">&#10003; Registration Confirmed</span>
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:24px 40px 32px;">
            <p style="margin:0 0 6px 0;font-size:18px;font-weight:600;color:#e2e0ff;">Hello, ${firstName}!</p>
            <p style="margin:0 0 24px 0;font-size:14px;color:#8888aa;line-height:1.7;">
              You have successfully registered for <strong style="color:#c4b5fd;">Technobit'26</strong> — the annual tech festival organized by BNMPC IT Club. Welcome aboard!
            </p>

            <!-- Account Details Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a30;border:1px solid #2a2a50;border-radius:12px;margin-bottom:24px;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 14px 0;font-size:11px;letter-spacing:2px;color:#6b6b8a;text-transform:uppercase;">Your Registration Details</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:5px 0;font-size:13px;color:#6b6b8a;width:40%;">Full Name</td>
                    <td style="padding:5px 0;font-size:13px;color:#e2e0ff;font-weight:500;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;font-size:13px;color:#6b6b8a;">Username</td>
                    <td style="padding:5px 0;font-size:13px;color:#e2e0ff;font-weight:500;">@${userName}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;font-size:13px;color:#6b6b8a;">Email</td>
                    <td style="padding:5px 0;font-size:13px;color:#e2e0ff;font-weight:500;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;font-size:13px;color:#6b6b8a;">Institution</td>
                    <td style="padding:5px 0;font-size:13px;color:#e2e0ff;font-weight:500;">${instituteLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;font-size:13px;color:#6b6b8a;">Class & Section</td>
                    <td style="padding:5px 0;font-size:13px;color:#e2e0ff;font-weight:500;">${className}${section ? ' — ' + section : ''}</td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <!-- What's Next -->
            <p style="margin:0 0 10px 0;font-size:11px;letter-spacing:2px;color:#6b6b8a;text-transform:uppercase;">What's Next</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="padding:7px 0;vertical-align:top;">
                  <span style="display:inline-block;width:20px;height:20px;background:#7c3aed;border-radius:50%;text-align:center;line-height:20px;font-size:11px;color:#fff;font-weight:700;margin-right:10px;">1</span>
                  <span style="font-size:13px;color:#a0a0c0;">Log in to your account at <a href="https://www.technobit26-itc.tech/login" style="color:#a78bfa;text-decoration:none;">technobit26-itc.tech/login</a></span>
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0;vertical-align:top;">
                  <span style="display:inline-block;width:20px;height:20px;background:#7c3aed;border-radius:50%;text-align:center;line-height:20px;font-size:11px;color:#fff;font-weight:700;margin-right:10px;">2</span>
                  <span style="font-size:13px;color:#a0a0c0;">Browse the <a href="https://www.technobit26-itc.tech/events" style="color:#a78bfa;text-decoration:none;">Events page</a> and register for your preferred segment(s)</span>
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0;vertical-align:top;">
                  <span style="display:inline-block;width:20px;height:20px;background:#7c3aed;border-radius:50%;text-align:center;line-height:20px;font-size:11px;color:#fff;font-weight:700;margin-right:10px;">3</span>
                  <span style="font-size:13px;color:#a0a0c0;">Check your profile for updates and event notifications</span>
                </td>
              </tr>
            </table>

            <!-- Dates Banner -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1030;border:1px solid #4f2d8a55;border-radius:10px;margin-bottom:8px;">
              <tr><td style="padding:14px 20px;text-align:center;">
                <p style="margin:0;font-size:12px;color:#8888aa;">Event Dates</p>
                <p style="margin:4px 0 0 0;font-size:16px;font-weight:700;color:#c4b5fd;">5 – 10 March 2026</p>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#1e1e38;"></div></td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:22px 40px;text-align:center;">
            <p style="margin:0 0 4px 0;font-size:12px;color:#444460;">This is an automated confirmation from Technobit'26. Please do not reply.</p>
            <p style="margin:0;font-size:11px;color:#333350;">© 2026 BNMPC IT Club — Birshreshtha Noor Mohammad Public College</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    }).catch(err => console.error('Registration email error:', err.message));

    // Auto-login: generate token and set cookie
    const tokenPayload = { id: newParticipant._id, userName: newParticipant.userName, mode: 'par' };
    const token = sign(tokenPayload, process.env.CLIENT_SECRET, { expiresIn: '30d' });
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: 'none',
    });

    res.status(201).json({
      succeed: true,
      msg: 'Congratulations!! Your registration is successful.',
      username: newParticipant.userName,
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
    path: '/',
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
// Gaming segments and Crack the Code - the only events BMARPC can register for
const BMARPC_ALLOWED_EVENTS = ['efootball', 'pubg-mobile', 'free-fire', 'chess', 'crack-the-code'];

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

    // BMARPC students can only register for gaming segments and Crack the Code
    if (user.college === 'BMARPC' && !BMARPC_ALLOWED_EVENTS.includes(eventName)) {
      return res.status(403).json({
        succeed: false,
        msg: 'BMARPC students can only register for Gaming segments and Crack the Code',
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
    const { eventValue } = req.params;
    const { skip = 0, rowNum = 50, searchKey = '' } = req.body || {};
    const query = {};

    // Filter by event if not 'allPar'
    if (eventValue && eventValue !== 'allPar') {
      query.registeredEvents = eventValue;
    }

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
      .select('-password -otp -otpCount -otpTime') // Exclude sensitive fields
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
    const { eventValue } = req.params;
    const { searchKey = '' } = req.query || {};
    const query = {};

    // Filter by event if not 'allPar'
    if (eventValue && eventValue !== 'allPar') {
      query.registeredEvents = eventValue;
    }

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

// Get full participant data by username (for profile page)
const getFullSingle = async (req, res) => {
  try {
    const { username } = req.params;
    
    const participant = await Participant.findOne({ userName: username }).select('-password');
    
    if (!participant) {
      return res.status(404).json({
        succeed: false,
        msg: 'Participant not found',
      });
    }

    res.json({
      succeed: true,
      result: participant,
    });
  } catch (error) {
    console.error('Get full single error:', error);
    res.status(500).json({
      succeed: false,
      msg: 'Failed to get participant data',
    });
  }
};

// Admin: Download CSV for a group
const GROUP_SLUGS = {
  freefire:    ['free-fire'],
  pubg:        ['pubg-mobile'],
  efootball:   ['efootball'],
  chess:       ['chess'],
  crackthecode:['crack-the-code'],
  submission:  ['poster-designing', 'ai-art', 'tech-meme-war', 'sci-fi-story'],
  quiz:        ['it-olympiad', 'gaming-quiz', 'robothon-olympiad', 'marvel-dc-quiz', 'animelogia', 'google-it'],
};

const downloadGroupCSV = async (req, res) => {
  try {
    const group = (req.params.group || '').toLowerCase();
    const slugs = GROUP_SLUGS[group];
    if (!slugs) {
      return res.status(400).json({ succeed: false, msg: 'Invalid group name. Valid: ' + Object.keys(GROUP_SLUGS).join(', ') });
    }

    const participants = await Participant.find({
      registeredEvents: { $in: slugs },
    }).select('fullName email phone whatsapp registeredEvents');

    // Build CSV
    const rows = [];
    rows.push('Full Name,Email,WhatsApp Number,Registered Events');
    for (const p of participants) {
      const wa = p.phone || p.whatsapp || '';
      const email = p.email || '';
      const name = (p.fullName || '').replace(/,/g, ' ');
      const events = (p.registeredEvents || []).filter(s => slugs.includes(s)).join(' | ');
      rows.push(`"${name}","${email}","${wa}","${events}"`);
    }

    const csv = rows.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${group}-participants.csv"`);
    res.send(csv);
  } catch (error) {
    console.error('Download CSV error:', error);
    return res.status(500).json({ succeed: false, msg: 'Failed to generate CSV.' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ succeed: false, msg: 'Email is required.' });

    const user = await Participant.findOne({ email });
    if (!user) return res.status(404).json({ succeed: false, msg: 'No account found with this email.' });

    // Generate 6-digit OTP valid for 15 minutes
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    await Participant.updateOne({ email }, { otp, otpTime: expiry });

    // Send OTP email
    try {
      const userName = user.fullName ? user.fullName.split(' ')[0] : 'Participant';
      const { error: mailErr } = await resend.emails.send({
        from: `Technobit'26 — BNMPC IT Club <${process.env.SERVER_EMAIL}>`,
        to: [email],
        subject: `Your Password Reset OTP — Technobit'26`,
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a14;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a14;padding:40px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#11111f;border-radius:16px;border:1px solid #2a2a4a;overflow:hidden;max-width:520px;width:100%;">
        
        <!-- Header Banner -->
        <tr>
          <td style="background:linear-gradient(135deg,#4f2d8a,#7c3aed,#6d28d9);padding:32px 40px;text-align:center;">
            <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:4px;color:#c4b5fd;text-transform:uppercase;">BNMPC IT Club Presents</p>
            <h1 style="margin:0;font-size:32px;font-weight:800;color:#ffffff;letter-spacing:2px;">TECHNOBIT'26</h1>
            <p style="margin:8px 0 0 0;font-size:12px;color:#ddd6fe;letter-spacing:1px;">technobit26-itc.tech</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 8px 0;font-size:15px;color:#a0a0c0;">Hello, <strong style="color:#e2e0ff;">${userName}</strong></p>
            <p style="margin:0 0 28px 0;font-size:14px;color:#8888aa;line-height:1.6;">
              We received a request to reset the password for your Technobit'26 account 
              associated with <strong style="color:#c4b5fd;">${email}</strong>.
              Use the OTP below to proceed.
            </p>

            <!-- OTP Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td align="center" style="background:#1a1a30;border:1px solid #4f2d8a;border-radius:12px;padding:28px 20px;">
                  <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:3px;color:#7c6ea0;text-transform:uppercase;">One-Time Password</p>
                  <p style="margin:0;font-size:44px;font-weight:700;letter-spacing:12px;color:#a78bfa;font-family:'Courier New',monospace;">${otp}</p>
                  <p style="margin:10px 0 0 0;font-size:12px;color:#6b6b8a;">Valid for <strong style="color:#c4b5fd;">15 minutes</strong></p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px 0;font-size:13px;color:#8888aa;line-height:1.6;">
              Enter this OTP on the password reset page along with your new password.
            </p>
            <p style="margin:0;font-size:12px;color:#555570;line-height:1.6;">
              ⚠️ If you did not request a password reset, please ignore this email. Your account remains secure.
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#1e1e38;"></div></td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0 0 4px 0;font-size:12px;color:#444460;">
              This is an automated email from Technobit'26. Please do not reply.
            </p>
            <p style="margin:0;font-size:11px;color:#333350;">
              © 2026 BNMPC IT Club — Birshreshtha Noor Mohammad Public College
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });
      if (mailErr) {
        console.error('Mail send error:', mailErr.message);
        return res.status(500).json({ succeed: false, msg: 'Failed to send OTP email. Please try again.' });
      }
    } catch (err) {
      throw err;
    }

    res.status(200).json({ succeed: true, msg: 'OTP sent to your email.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ succeed: false, msg: 'Failed to process request.' });
  }
};

const resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
      return res.status(400).json({ succeed: false, msg: 'Email, OTP, and new password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ succeed: false, msg: 'Password must be at least 6 characters.' });
    }

    const user = await Participant.findOne({ email });
    if (!user) return res.status(404).json({ succeed: false, msg: 'Account not found.' });
    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ succeed: false, msg: 'Invalid OTP.' });
    }
    if (!user.otpTime || new Date() > new Date(user.otpTime)) {
      return res.status(400).json({ succeed: false, msg: 'OTP has expired. Please request a new one.' });
    }

    const hashedPassword = hashSync(password, 10);
    await Participant.updateOne({ email }, { password: hashedPassword, otp: null, otpTime: null });

    res.status(200).json({ succeed: true, msg: 'Password reset successfully.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ succeed: false, msg: 'Failed to reset password.' });
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
  getFullSingle,
  downloadGroupCSV,
  forgotPassword,
  resetPasswordWithOTP,
};
