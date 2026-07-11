const { Router } = require("express");
const usersController = require("./users.controller");
const validate = require("../../middleware/validate");
const { authenticate, authorizeRoles } = require("../../middleware/auth");
const {
  createUserSchema,
  updateUserSchema,
  assignRoleSchema,
} = require("./users.validator");

const router = Router();

router.use(authenticate);

router.get("/", authorizeRoles("admin"), usersController.listUsers);
router.get("/:id", usersController.getUserById);
router.post("/", authorizeRoles("admin"), validate(createUserSchema), usersController.createUser);
router.patch("/:id", validate(updateUserSchema), usersController.updateUser);
router.delete("/:id", authorizeRoles("admin"), usersController.deleteUser);
router.post(
  "/:id/roles",
  authorizeRoles("admin"),
  validate(assignRoleSchema),
  usersController.assignRole
);
router.delete("/:id/roles/:roleId", authorizeRoles("admin"), usersController.removeRole);

module.exports = router;