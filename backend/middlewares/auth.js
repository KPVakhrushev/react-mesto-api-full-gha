const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) throw new ErrorUnauthorized();
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    next(new ErrorUnauthorized());
  }
};
