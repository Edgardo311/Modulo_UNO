const AppError = require("../../utils/AppError");
const { hashPassword, comparePassword, signToken } = require("../../utils/security");
const usersRepository = require("../users/users.repository");
const rolesRepository = require("../roles/roles.repository");

async function register({ email, password, firstName, lastName }) {
  const existingUser = await usersRepository.findByEmail(email);
  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  const defaultRole = await rolesRepository.findRoleByName("user");
  const passwordHash = await hashPassword(password);

  const createdUser = await usersRepository.createUser({
    email,
    passwordHash,
    firstName,
    lastName,
    roleIds: defaultRole ? [defaultRole.id] : [],
  });

  const userRoles = await usersRepository.findRolesByUserId(createdUser.id);
  const token = signToken({
    sub: createdUser.id,
    email: createdUser.email,
    roles: userRoles.map((role) => role.name),
  });

  return {
    user: {
      ...createdUser,
      roles: userRoles,
    },
    token,
  };
}

async function login({ email, password }) {
  const user = await usersRepository.findByEmail(email);
  if (!user || user.deleted_at || !user.is_active) {
    throw new AppError("Invalid credentials", 401);
  }

  const validPassword = await comparePassword(password, user.password_hash);
  if (!validPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const userRoles = await usersRepository.findRolesByUserId(user.id);

  const token = signToken({
    sub: user.id,
    email: user.email,
    roles: userRoles.map((role) => role.name),
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_active: user.is_active,
      roles: userRoles,
    },
    token,
  };
}

module.exports = {
  register,
  login,
};