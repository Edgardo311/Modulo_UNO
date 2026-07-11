const { Router } = require("express");
const rolesController = require("./roles.controller");
const validate = require("../../middleware/validate");
const { authenticate, authorizeRoles } = require("../../middleware/auth");
const { createRoleSchema, updateRoleSchema } = require("./roles.validator");

const router = Router();

router.use(authenticate);

router.get("/", rolesController.listRoles);
router.post("/", authorizeRoles("admin"), validate(createRoleSchema), rolesController.createRole);
router.patch("/:id", authorizeRoles("admin"), validate(updateRoleSchema), rolesController.updateRole);
router.delete("/:id", authorizeRoles("admin"), rolesController.deleteRole);

module.exports = router;