const { verify } = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors')

const adminValidate = (req, res, next) => {
  const token =
    req.signedCookies?.admin_token ||
    req.cookies?.admin_token
  if (!token) {
    throw new UnauthorizedError('admin not logged in')
  }
  try {
    const validAdmin = verify(token, process.env.ADMIN_SECRET)
    if (!validAdmin) {
      throw new UnauthorizedError('you do not have permission to access this route')
    }
    req.admin = validAdmin
    next()
  } catch (err) {
    throw new UnauthorizedError('Invalid or expired admin token')
  }
}

module.exports = adminValidate
