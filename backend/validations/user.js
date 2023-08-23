const {
  Joi, celebrate, Segments, errors,
} = require('celebrate');
const { URL_REGEX } = require('../config');

const updateKeys = {
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().uri().pattern(URL_REGEX).messages({ '*': 'Invalid URL' }),
};
const authKeys = {
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
};
const allKeys = {
  ...authKeys,
  ...updateKeys,
};

module.exports = {
  ...allKeys,
  fullCheck: () => celebrate({
    [Segments.BODY]: Joi.object().keys(allKeys),
  }),
  updateCheck: () => celebrate({
    [Segments.BODY]: Joi.object().keys(updateKeys),
  }),
  authCheck: () => celebrate({
    [Segments.BODY]: Joi.object().keys(authKeys),
  }),
  errors,
};
