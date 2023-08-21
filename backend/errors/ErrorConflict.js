const httpConstants = require('http2').constants;

module.exports = class ErrorNotfound extends Error {
  constructor(message) {
    super(message);
    this.code = httpConstants.HTTP_STATUS_CONFLICT;
  }
};
