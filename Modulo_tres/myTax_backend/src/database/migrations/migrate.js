const { query, pool } = require("../../config/db");

async function migrate() {
  await query("CREATE EXTENSION IF NOT EXISTS pgcrypto;");

  try {
    await query("CREATE EXTENSION IF NOT EXISTS vector;");
  } catch (error) {
    if (error && error.code !== "0A000") {
      throw error;
    }
    console.warn("vector extension not available; continuing without it");
  }

  await query(`
    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      description VARCHAR(255),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT true,
      deleted_at TIMESTAMP NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS user_roles (
      id SERIAL PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
      assigned_at TIMESTAMP NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, role_id)
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS fiel_signatures (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      rfc VARCHAR(13) NOT NULL,
      certificate_type VARCHAR(20) NOT NULL,
      certificate_serial VARCHAR(255) NOT NULL,
      certificate_thumbprint VARCHAR(64) NOT NULL,
      certificate_subject TEXT NOT NULL,
      certificate_issuer TEXT NOT NULL,
      certificate_der BYTEA,
      private_key_der BYTEA,
      valid_from TIMESTAMP NOT NULL,
      valid_until TIMESTAMP NOT NULL,
      is_currently_valid BOOLEAN NOT NULL DEFAULT true,
      uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT fiel_valid_dates CHECK (valid_from < valid_until),
      CONSTRAINT fiel_type_check CHECK (certificate_type IN ('EFIRMA', 'CSD', 'UNKNOWN'))
    );
  `);

  await query(`
    ALTER TABLE fiel_signatures
    ADD COLUMN IF NOT EXISTS certificate_der BYTEA;
  `);

  await query(`
    ALTER TABLE fiel_signatures
    ADD COLUMN IF NOT EXISTS private_key_der BYTEA;
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS sat_download_jobs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      fiel_signature_id UUID NOT NULL REFERENCES fiel_signatures(id) ON DELETE RESTRICT,
      rfc_solicitante VARCHAR(13) NOT NULL,
      fecha_inicio TIMESTAMP NOT NULL,
      fecha_fin TIMESTAMP NOT NULL,
      sat_request_id VARCHAR(100),
      sat_codestatus VARCHAR(10),
      sat_estado_solicitud VARCHAR(10),
      sat_mensaje TEXT,
      estado_local VARCHAR(20) NOT NULL DEFAULT 'REQUESTED',
      total_paquetes INTEGER NOT NULL DEFAULT 0,
      total_cfdis INTEGER NOT NULL DEFAULT 0,
      last_refresh_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT sat_download_jobs_estado_local_check CHECK (estado_local IN ('REQUESTED', 'PROCESSING', 'READY', 'ERROR', 'REJECTED', 'COMPLETED')),
      CONSTRAINT sat_download_jobs_range_check CHECK (fecha_inicio < fecha_fin)
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS sat_download_packages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      job_id UUID NOT NULL REFERENCES sat_download_jobs(id) ON DELETE CASCADE,
      sat_package_id VARCHAR(100) NOT NULL,
      sat_codestatus VARCHAR(10),
      sat_mensaje TEXT,
      estado_descarga VARCHAR(20) NOT NULL DEFAULT 'PENDING',
      downloaded_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      UNIQUE (job_id, sat_package_id),
      CONSTRAINT sat_download_packages_estado_check CHECK (estado_descarga IN ('PENDING', 'DOWNLOADED', 'ERROR'))
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS sat_download_cfdis (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      job_id UUID NOT NULL REFERENCES sat_download_jobs(id) ON DELETE CASCADE,
      package_id UUID NOT NULL REFERENCES sat_download_packages(id) ON DELETE CASCADE,
      uuid VARCHAR(36),
      rfc_emisor VARCHAR(13),
      rfc_receptor VARCHAR(13),
      fecha_emision TIMESTAMP,
      tipo_comprobante VARCHAR(5),
      xml_text TEXT NOT NULL,
      xml_checksum VARCHAR(64) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      UNIQUE (job_id, xml_checksum)
    );
  `);

  await query("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);");
  await query("CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);");
  await query("CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);");
  await query("CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);");
  await query("CREATE INDEX IF NOT EXISTS idx_fiel_signatures_user_id ON fiel_signatures(user_id);");
  await query("CREATE INDEX IF NOT EXISTS idx_fiel_signatures_rfc ON fiel_signatures(rfc);");
  await query("CREATE INDEX IF NOT EXISTS idx_fiel_signatures_valid_until ON fiel_signatures(valid_until);");
  await query("CREATE INDEX IF NOT EXISTS idx_sat_download_jobs_user_id ON sat_download_jobs(user_id);");
  await query("CREATE INDEX IF NOT EXISTS idx_sat_download_jobs_estado_local ON sat_download_jobs(estado_local);");
  await query("CREATE INDEX IF NOT EXISTS idx_sat_download_jobs_sat_request_id ON sat_download_jobs(sat_request_id);");
  await query("CREATE INDEX IF NOT EXISTS idx_sat_download_packages_job_id ON sat_download_packages(job_id);");
  await query("CREATE INDEX IF NOT EXISTS idx_sat_download_cfdis_job_id ON sat_download_cfdis(job_id);");
  await query("CREATE INDEX IF NOT EXISTS idx_sat_download_cfdis_uuid ON sat_download_cfdis(uuid);");

  // Knowledge base for document agent
  await query(`
    CREATE TABLE IF NOT EXISTS knowledge_documents (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      original_filename VARCHAR(255) NOT NULL,
      mime_type VARCHAR(100) NOT NULL DEFAULT 'application/pdf',
      uploaded_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  try {
    await query(`
      CREATE TABLE IF NOT EXISTS knowledge_chunks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        document_id UUID NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
        chunk_index INTEGER NOT NULL,
        content TEXT NOT NULL,
        embedding vector(1536) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await query("CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_document_id ON knowledge_chunks(document_id);");
  } catch (error) {
    if (error && error.code !== "42704") {
      throw error;
    }
    console.warn("vector type unavailable; skipping knowledge_chunks table creation");
  }

  await query("CREATE INDEX IF NOT EXISTS idx_knowledge_documents_uploaded_by ON knowledge_documents(uploaded_by);");

  await query(`
    CREATE TABLE IF NOT EXISTS legal_laws (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      ley VARCHAR(500) NOT NULL,
      reforma VARCHAR(255),
      pdf VARCHAR(1024) NOT NULL,
      source_url VARCHAR(1024) NOT NULL,
      row_code VARCHAR(50),
      content_hash VARCHAR(64) NOT NULL UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS legal_laws_sync_runs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      status VARCHAR(20) NOT NULL,
      source_url VARCHAR(1024) NOT NULL,
      error_message TEXT,
      total_extracted INTEGER NOT NULL DEFAULT 0,
      total_upserted INTEGER NOT NULL DEFAULT 0,
      started_at TIMESTAMP NOT NULL DEFAULT NOW(),
      finished_at TIMESTAMP,
      CONSTRAINT legal_laws_sync_runs_status_check CHECK (status IN ('RUNNING', 'SUCCESS', 'FAILED'))
    );
  `);

  await query("CREATE INDEX IF NOT EXISTS idx_legal_laws_ley ON legal_laws(ley);");
  await query("CREATE INDEX IF NOT EXISTS idx_legal_laws_reforma ON legal_laws(reforma);");
  await query("CREATE INDEX IF NOT EXISTS idx_legal_laws_sync_runs_started_at ON legal_laws_sync_runs(started_at DESC);");

  // Fiscal data module
  await query(`
    CREATE TABLE IF NOT EXISTS fiscal_activities (
      id SERIAL PRIMARY KEY,
      code VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS user_fiscal_data (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      rfc VARCHAR(13) UNIQUE NOT NULL,
      cp VARCHAR(5) NOT NULL,
      activity_id INTEGER NOT NULL REFERENCES fiscal_activities(id) ON DELETE RESTRICT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT rfc_format CHECK (rfc ~* '^[A-Z0-9]{13}$'),
      CONSTRAINT cp_format CHECK (cp ~* '^[0-9]{5}$')
    );
  `);

  await query("CREATE INDEX IF NOT EXISTS idx_user_fiscal_data_user_id ON user_fiscal_data(user_id);");
  await query("CREATE INDEX IF NOT EXISTS idx_user_fiscal_data_rfc ON user_fiscal_data(rfc);");
  await query("CREATE INDEX IF NOT EXISTS idx_user_fiscal_data_activity_id ON user_fiscal_data(activity_id);");

  // Seed fiscal_activities if not exists
  await query(`
    INSERT INTO fiscal_activities (code, name, description)
    SELECT 'PROFESSIONAL', 'Profesionista', 'Actividades de Profesionistas'
    WHERE NOT EXISTS (SELECT 1 FROM fiscal_activities WHERE code = 'PROFESSIONAL');
  `);

  await query(`
    INSERT INTO fiscal_activities (code, name, description)
    SELECT 'COMMERCE', 'Comercio', 'Actividades Comerciales'
    WHERE NOT EXISTS (SELECT 1 FROM fiscal_activities WHERE code = 'COMMERCE');
  `);

  await query(`
    INSERT INTO fiscal_activities (code, name, description)
    SELECT 'SERVICES', 'Servicios', 'Prestación de Servicios'
    WHERE NOT EXISTS (SELECT 1 FROM fiscal_activities WHERE code = 'SERVICES');
  `);

  await query(`
    INSERT INTO fiscal_activities (code, name, description)
    SELECT 'MANUFACTURING', 'Manufactura', 'Actividades de Manufactura'
    WHERE NOT EXISTS (SELECT 1 FROM fiscal_activities WHERE code = 'MANUFACTURING');
  `);

  await query(`
    INSERT INTO fiscal_activities (code, name, description)
    SELECT 'AGRICULTURE', 'Agricultura', 'Actividades Agrícolas'
    WHERE NOT EXISTS (SELECT 1 FROM fiscal_activities WHERE code = 'AGRICULTURE');
  `);

  await query(`
    INSERT INTO fiscal_activities (code, name, description)
    SELECT 'OTHER', 'Otro', 'Otras Actividades'
    WHERE NOT EXISTS (SELECT 1 FROM fiscal_activities WHERE code = 'OTHER');
  `);
}

async function run() {
  try {
    await migrate();
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();