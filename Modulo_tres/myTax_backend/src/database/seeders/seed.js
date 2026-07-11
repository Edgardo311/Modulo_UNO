const { v4: uuidv4 } = require("uuid");
const { query, pool } = require("../../config/db");
const { hashPassword } = require("../../utils/security");

async function upsertRole(name, description) {
  const sql = `
    INSERT INTO roles (name, description)
    VALUES ($1, $2)
    ON CONFLICT (name) DO UPDATE
    SET description = EXCLUDED.description, updated_at = NOW()
    RETURNING id, name
  `;
  const result = await query(sql, [name, description]);
  return result.rows[0];
}

async function seedAdminUser(adminRoleId) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@appapi.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";
  const adminFirstName = process.env.ADMIN_FIRST_NAME || "System";
  const adminLastName = process.env.ADMIN_LAST_NAME || "Admin";

  const existing = await query("SELECT id FROM users WHERE email = $1 LIMIT 1", [
    adminEmail.toLowerCase(),
  ]);

  let userId;
  if (existing.rows[0]) {
    userId = existing.rows[0].id;
  } else {
    userId = uuidv4();
    const passwordHash = await hashPassword(adminPassword);
    await query(
      `
      INSERT INTO users (id, email, password_hash, first_name, last_name, is_active)
      VALUES ($1, $2, $3, $4, $5, true)
      `,
      [userId, adminEmail.toLowerCase(), passwordHash, adminFirstName, adminLastName]
    );
  }

  await query(
    `
    INSERT INTO user_roles (user_id, role_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, role_id) DO NOTHING
    `,
    [userId, adminRoleId]
  );
}

async function seed() {
  const adminRole = await upsertRole("admin", "Administrator role");
  await upsertRole("user", "Default application user role");
  await seedAdminUser(adminRole.id);
}

async function run() {
  try {
    await seed();
    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Seed failed", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();