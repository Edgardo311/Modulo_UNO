const { Router } = require("express");
const authController = require("./auth.controller");
const validate = require("../../middleware/validate");
const { registerSchema, loginSchema } = require("./auth.validator");

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;