const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED_ERROR_ON_AUTH_CHECK } = require('../utils/constants');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_ON_AUTH_CHECK);
  }

  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_ON_AUTH_CHECK);
  }

  req.user = payload;
  next();
};
