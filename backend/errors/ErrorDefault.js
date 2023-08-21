const httpConstants = require('http2').constants;

module.exports = class ErrorVlidation extends Error {
  constructor(message = 'На сервере произошла ошибка') {
    super(message);
    this.code = httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  }
};
