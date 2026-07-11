const AppError = require("../../utils/AppError");
const { hashPassword } = require("../../utils/security");
const usersRepository = require("./users.repository");
const rolesRepository = require("../roles/roles.repository");

async function listUsers() {
  const users = await usersRepository.listUsers();

  const usersWithRoles = await Promise.all(
    users.map(async (user) => {
      const roles = await usersRepository.findRolesByUserId(user.id);
      return { ...user, roles };
    })
  );

  return usersWithRoles;
}

async function getUserById(userId) {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const roles = await usersRepository.findRolesByUserId(userId);
  return { ...user, roles };
}

async function createUser({ email, password, firstName, lastName, roleIds }) {
  const existingUser = await usersRepository.findByEmail(email);
  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  for (const roleId of roleIds) {
    const role = await rolesRepository.findRoleById(roleId);
    if (!role) {
      throw new AppError(`Role ${roleId} not found`, 404);
    }
  }

  const passwordHash = await hashPassword(password);
  const user = await usersRepository.createUser({
    email,
    passwordHash,
    firstName,
    lastName,
    roleIds,
  });

  const roles = await usersRepository.findRolesByUserId(user.id);
  return { ...user, roles };
}

async function updateUser(userId, payload, actor) {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isAdmin = (actor.roles || []).includes("admin");
  const isOwner = actor.sub === userId;

  if (!isAdmin && !isOwner) {
    throw new AppError("Forbidden", 403);
  }

  let passwordHash;
  if (payload.password) {
    passwordHash = await hashPassword(payload.password);
  }

  let isActive = payload.isActive;
  if (!isAdmin) {
    isActive = undefined;
  }

  const updated = await usersRepository.updateUser(userId, {
    firstName: payload.firstName,
    lastName: payload.lastName,
    passwordHash,
    isActive,
  });

  const roles = await usersRepository.findRolesByUserId(userId);
  return { ...updated, roles };
}

async function softDeleteUser(userId) {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  await usersRepository.softDeleteUser(userId);
}

async function assignRole(userId, roleId) {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const role = await rolesRepository.findRoleById(roleId);
  if (!role) {
    throw new AppError("Role not found", 404);
  }

  return usersRepository.assignRole(userId, roleId);
}

async function removeRole(userId, roleId) {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  await usersRepository.removeRole(userId, roleId);
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  softDeleteUser,
  assignRole,
  removeRole,
};