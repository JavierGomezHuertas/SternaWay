const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  birthDate: Joi.date().required(),
  country: Joi.string(),
  acceptedTOS: Joi.bool().required(),
});
