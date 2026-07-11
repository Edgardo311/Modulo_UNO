const Joi = require("joi");

const createRoleSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(255).allow("", null),
});

const updateRoleSchema = Joi.object({
  description: Joi.string().max(255).allow("", null).required(),
});

module.exports = {
  createRoleSchema,
  updateRoleSchema,
};