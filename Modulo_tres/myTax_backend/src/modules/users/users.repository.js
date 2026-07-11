const { query, withTransaction } = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

async function findByEmail(email) {
  const sql = `
    SELECT id, email, password_hash, first_name, last_name, is_active, deleted_at, created_at, updated_at
    FROM users
    WHERE email = $1
    LIMIT 1
  `;
  const result = await query(sql, [email.toLowerCase()]);
  return result.rows[0] || null;
}

async function findById(userId) {
  const sql = `
    SELECT id, email, first_name, last_name, is_active, deleted_at, created_at, updated_at
    FROM users
    WHERE id = $1
    LIMIT 1
  `;
  const result = await query(sql, [userId]);
  return result.rows[0] || null;
}

async function listUsers() {
  const sql = `
    SELECT id, email, first_name, last_name, is_active, deleted_at, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
  `;
  const result = await query(sql);
  return result.rows;
}

async function createUser({ email, passwordHash, firstName, lastName, roleIds = [] }) {
  const userId = uuidv4();

  return withTransaction(async (client) => {
    const insertUserSql = `
      INSERT INTO users (id, email, password_hash, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, first_name, last_name, is_active, deleted_at, created_at, updated_at
    `;

    const userResult = await client.query(insertUserSql, [
      userId,
      email.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
    ]);

    if (roleIds.length > 0) {
      const insertRoleSql = `
        INSERT INTO user_roles (user_id, role_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, role_id) DO NOTHING
      `;

      for (const roleId of roleIds) {
        await client.query(insertRoleSql, [userId, roleId]);
      }
    }

    return userResult.rows[0];
  });
}

async function updateUser(userId, { firstName, lastName, passwordHash, isActive }) {
  const sql = `
    UPDATE users
    SET
      first_name = COALESCE($2, first_name),
      last_name = COALESCE($3, last_name),
      password_hash = COALESCE($4, password_hash),
      is_active = COALESCE($5, is_active),
      updated_at = NOW()
    WHERE id = $1
    RETURNING id, email, first_name, last_name, is_active, deleted_at, created_at, updated_at
  `;
  const result = await query(sql, [userId, firstName, lastName, passwordHash, isActive]);
  return result.rows[0] || null;
}

async function softDeleteUser(userId) {
  const sql = `
    UPDATE users
    SET is_active = false, deleted_at = NOW(), updated_at = NOW()
    WHERE id = $1
    RETURNING id
  `;
  const result = await query(sql, [userId]);
  return result.rows[0] || null;
}

async function assignRole(userId, roleId) {
  const sql = `
    INSERT INTO user_roles (user_id, role_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, role_id) DO NOTHING
    RETURNING user_id, role_id
  `;
  const result = await query(sql, [userId, roleId]);
  return result.rows[0] || { user_id: userId, role_id: roleId };
}

async function removeRole(userId, roleId) {
  const sql = `
    DELETE FROM user_roles
    WHERE user_id = $1 AND role_id = $2
  `;
  await query(sql, [userId, roleId]);
}

async function findRolesByUserId(userId) {
  const sql = `
    SELECT r.id, r.name, r.description
    FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = $1
    ORDER BY r.name
  `;
  const result = await query(sql, [userId]);
  return result.rows;
}

module.exports = {
  findByEmail,
  findById,
  listUsers,
  createUser,
  updateUser,
  softDeleteUser,
  assignRole,
  removeRole,
  findRolesByUserId,
};