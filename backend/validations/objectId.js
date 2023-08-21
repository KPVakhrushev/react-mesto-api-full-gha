const {
  Joi, celebrate, Segments, errors,
} = require('celebrate');

Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId().messages({ '*': 'Invalid ID' });
module.exports = {
  id,
  check: (key, segment = Segments.PARAMS) => celebrate({
    [segment]: Joi.object().keys({
      [key]: id,
    }),
  }),
  errors,
};
