const httpConstants = require('http2').constants;

module.exports = class ErrorUnauthorized extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.code = httpConstants.HTTP_STATUS_UNAUTHORIZED;
  }
};
