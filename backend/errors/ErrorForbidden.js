const httpConstants = require('http2').constants;

module.exports = class ErrorForbidden extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.code = httpConstants.HTTP_STATUS_FORBIDDEN;
  }
};
