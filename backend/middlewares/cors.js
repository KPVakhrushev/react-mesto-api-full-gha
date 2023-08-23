const { CORS_ALLOW_METHODS, CORS_ALLOW_ORIGIN } = process.env;

module.exports = function(req, res, next) {
  const { origin } = req.headers;
  const allowOrigin = CORS_ALLOW_ORIGIN.split(', ');
  if (allowOrigin.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', CORS_ALLOW_METHODS);
      res.header('Access-Control-Allow-Headers',  req.headers['access-control-request-headers']);

      return res.end();
  }
  next();
};
