const {
  Joi, celebrate, Segments, errors,
} = require('celebrate');
const { URL_REGEX } = require('../config');

const keys = {
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().uri().pattern(URL_REGEX)
    .messages({ '*': 'Invalid URL' }),
};

module.exports = {
  ...keys,
  check: () => celebrate({
    [Segments.BODY]: Joi.object().keys(keys),
  }),
  errors,
};
