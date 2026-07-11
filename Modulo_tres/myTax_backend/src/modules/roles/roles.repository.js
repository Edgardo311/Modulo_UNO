const { query } = require("../../config/db");

async function listRoles() {
  const sql = `
    SELECT r.id, r.name, r.description, COUNT(ur.user_id)::int AS user_count
    FROM roles r
    LEFT JOIN user_roles ur ON ur.role_id = r.id
    GROUP BY r.id, r.name, r.description
    ORDER BY r.name
  `;
  const result = await query(sql);
  return result.rows;
}

async function findRoleById(roleId) {
  const sql = `
    SELECT id, name, description
    FROM roles
    WHERE id = $1
    LIMIT 1
  `;
  const result = await query(sql, [roleId]);
  return result.rows[0] || null;
}

async function findRoleByName(name) {
  const sql = `
    SELECT id, name, description
    FROM roles
    WHERE name = $1
    LIMIT 1
  `;
  const result = await query(sql, [name]);
  return result.rows[0] || null;
}

async function createRole({ name, description }) {
  const sql = `
    INSERT INTO roles (name, description)
    VALUES ($1, $2)
    RETURNING id, name, description
  `;
  const result = await query(sql, [name, description]);
  return result.rows[0];
}

async function updateRole(roleId, { description }) {
  const sql = `
    UPDATE roles
    SET description = COALESCE($2, description), updated_at = NOW()
    WHERE id = $1
    RETURNING id, name, description
  `;
  const result = await query(sql, [roleId, description]);
  return result.rows[0] || null;
}

async function countUsersWithRole(roleId) {
  const sql = `
    SELECT COUNT(*)::int AS total
    FROM user_roles
    WHERE role_id = $1
  `;
  const result = await query(sql, [roleId]);
  return result.rows[0].total;
}

async function deleteRole(roleId) {
  const sql = `DELETE FROM roles WHERE id = $1`;
  await query(sql, [roleId]);
}

module.exports = {
  listRoles,
  findRoleById,
  findRoleByName,
  createRole,
  updateRole,
  countUsersWithRole,
  deleteRole,
};