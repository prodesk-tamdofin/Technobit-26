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
      secure: process.env.NODE_ENV === 'production',
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
  res.clearCookie('token');
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

    res.json({
      succeed: true,
      user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      succeed: false,
      msg: 'Failed to get user data',
    });
  }
};

module.exports = {
  registration,
  login,
  logout,
  getUser,
};
