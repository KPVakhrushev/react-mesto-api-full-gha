const { CORS_ALLOW_METHODS, CORS_ALLOW_ORIGIN } = require('../config');

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if ([origin, '*'].some((v) => CORS_ALLOW_ORIGIN.includes(v))) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', CORS_ALLOW_METHODS);
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);

    res.end();
  }
  next();
};
