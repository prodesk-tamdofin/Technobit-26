const { sign, verify } = require('jsonwebtoken');

const adminLogin = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({
      succeed: false,
      msg: 'Username or password missing.',
    });
  }

  if (
    userName !== process.env.ADMIN_USER ||
    password !== process.env.ADMIN_PASS
  ) {
    return res.status(401).json({
      succeed: false,
      msg: 'Invalid admin credentials.',
    });
  }

  const token = sign(
    { userName, role: 'admin' },
    process.env.ADMIN_SECRET,
    { expiresIn: '7d' },
  );

  res.cookie('admin_token', token, {
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.json({
    succeed: true,
    result: true,
    msg: 'Admin login successful.',
  });
};

const adminAuth = async (req, res) => {
  const token = req.signedCookies?.admin_token || req.cookies?.admin_token;

  if (!token) {
    return res.json({ succeed: true, result: false });
  }

  try {
    verify(token, process.env.ADMIN_SECRET);
    return res.json({ succeed: true, result: true });
  } catch (err) {
    return res.json({ succeed: true, result: false });
  }
};

const adminLogout = async (req, res) => {
  res.clearCookie('admin_token');
  return res.json({ succeed: true, msg: 'Logged out.' });
};

module.exports = {
  adminLogin,
  adminAuth,
  adminLogout,
};
