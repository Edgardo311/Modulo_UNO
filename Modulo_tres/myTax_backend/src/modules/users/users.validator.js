const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(128).required(),
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
  roleIds: Joi.array().items(Joi.number().integer().positive()).default([]),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().min(1).max(100),
  lastName: Joi.string().min(1).max(100),
  password: Joi.string().min(8).max(128),
  isActive: Joi.boolean(),
}).min(1);

const assignRoleSchema = Joi.object({
  roleId: Joi.number().integer().positive().required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  assignRoleSchema,
};