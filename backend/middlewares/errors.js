const { errors } = require('celebrate');
const { errorLogger } = require('./logger');
const ErrorValidation = require('../errors/ErrorValidation');
const ErrorNotfound = require('../errors/ErrorNotfound');
const ErrorDefault = require('../errors/ErrorDefault');

module.exports = [
  /* ошибки celebrate */
  errors(),
  /* 404 */
  () => {
    throw new ErrorNotfound('Страница не найдена');
  },
  /* ошибки без кода */
  (err, req, res, next) => {    
    if(err.code) return (next(err));
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      throw new ErrorValidation(err.message);
    }
    throw new ErrorDefault();
  },
  /* логер ошибок */
  errorLogger,
  /* ответ с ошибкой */
  (err, req, res, next) => {
    res.status(err.code).send({ message: err.message });
    next();
  }
]
