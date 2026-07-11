const AppError = require("../../utils/AppError");
const rolesRepository = require("./roles.repository");

async function listRoles() {
  return rolesRepository.listRoles();
}

async function createRole({ name, description }) {
  const existing = await rolesRepository.findRoleByName(name);
  if (existing) {
    throw new AppError("Role already exists", 409);
  }
  return rolesRepository.createRole({ name, description });
}

async function updateRole(roleId, { description }) {
  const role = await rolesRepository.findRoleById(roleId);
  if (!role) {
    throw new AppError("Role not found", 404);
  }
  return rolesRepository.updateRole(roleId, { description });
}

async function deleteRole(roleId) {
  const role = await rolesRepository.findRoleById(roleId);
  if (!role) {
    throw new AppError("Role not found", 404);
  }

  const usersTotal = await rolesRepository.countUsersWithRole(roleId);
  if (usersTotal > 0) {
    throw new AppError("Role has assigned users and cannot be deleted", 409);
  }

  await rolesRepository.deleteRole(roleId);
}

module.exports = {
  listRoles,
  createRole,
  updateRole,
  deleteRole,
};