const Joi = require("joi");

const email = Joi.string().email().max(255).required();
const password = Joi.string().min(8).max(128).required();

const registerSchema = Joi.object({
  email,
  password,
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
});

const loginSchema = Joi.object({
  email,
  password,
});

module.exports = {
  registerSchema,
  loginSchema,
};