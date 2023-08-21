const httpConstants = require('http2').constants;

module.exports = class ErrorValidation extends Error {
  constructor(message) {
    super(message);
    this.code = httpConstants.HTTP_STATUS_BAD_REQUEST;
  }
};
