const rolesService = require("./roles.service");

async function listRoles(req, res, next) {
  try {
    const roles = await rolesService.listRoles();
    res.status(200).json({ data: roles });
  } catch (error) {
    next(error);
  }
}

async function createRole(req, res, next) {
  try {
    const role = await rolesService.createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
}

async function updateRole(req, res, next) {
  try {
    const role = await rolesService.updateRole(Number(req.params.id), req.body);
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
}

async function deleteRole(req, res, next) {
  try {
    await rolesService.deleteRole(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listRoles,
  createRole,
  updateRole,
  deleteRole,
};