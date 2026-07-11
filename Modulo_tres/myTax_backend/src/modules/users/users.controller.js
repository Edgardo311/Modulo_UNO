const usersService = require("./users.service");

async function listUsers(req, res, next) {
  try {
    const users = await usersService.listUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await usersService.updateUser(req.params.id, req.body, req.user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    await usersService.softDeleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function assignRole(req, res, next) {
  try {
    const assignment = await usersService.assignRole(req.params.id, req.body.roleId);
    res.status(201).json(assignment);
  } catch (error) {
    next(error);
  }
}

async function removeRole(req, res, next) {
  try {
    await usersService.removeRole(req.params.id, Number(req.params.roleId));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  assignRole,
  removeRole,
};