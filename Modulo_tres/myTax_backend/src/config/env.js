require("dotenv").config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || "change-me-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: Number(process.env.DB_PORT || 5432),
  dbName: process.env.DB_NAME || "app_api",
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "postgres",
  fielMaxFileSize: Number(process.env.FIEL_MAX_FILE_SIZE || 524288),
  satCfdiAuthUrl:
    process.env.SAT_CFDI_AUTH_URL ||
    "https://cfdidescargamasivasolicitud.clouda.sat.gob.mx/Autenticacion/Autenticacion.svc",
  satCfdiRequestUrl:
    process.env.SAT_CFDI_REQUEST_URL ||
    "https://cfdidescargamasivasolicitud.clouda.sat.gob.mx/SolicitaDescargaService.svc",
  satCfdiVerifyUrl:
    process.env.SAT_CFDI_VERIFY_URL ||
    "https://cfdidescargamasivasolicitud.clouda.sat.gob.mx/VerificaSolicitudDescargaService.svc",
  satCfdiDownloadUrl:
    process.env.SAT_CFDI_DOWNLOAD_URL ||
    "https://cfdidescargamasiva.clouda.sat.gob.mx/DescargaMasivaService.svc",
  satTimeoutMs: Number(process.env.SAT_TIMEOUT_MS || 60000),
  satMaxWindowHours: Number(process.env.SAT_MAX_WINDOW_HOURS || 24),
  satMaxRetries: Number(process.env.SAT_MAX_RETRIES || 3),
  satMaxPackagesPerRefresh: Number(process.env.SAT_MAX_PACKAGES_PER_REFRESH || 10),
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  embeddingModel: process.env.EMBEDDING_MODEL || "text-embedding-3-small",
  vectorSimilarityThreshold: Number(process.env.VECTOR_SIMILARITY_THRESHOLD || 0.75),
  vectorTopK: Number(process.env.VECTOR_TOP_K || 5),
  legalLawsSourceUrl:
    process.env.LEGAL_LAWS_SOURCE_URL ||
    "https://www.diputados.gob.mx/LeyesBiblio/index.htm",
  legalLawsRequestTimeoutMs: Number(process.env.LEGAL_LAWS_REQUEST_TIMEOUT_MS || 30000),
  legalLawsSyncEnabled: String(process.env.LEGAL_LAWS_SYNC_ENABLED || "true") === "true",
  legalLawsCronExpression: process.env.LEGAL_LAWS_CRON_EXPRESSION || "0 3 * * *",
lawsApiUrl: process.env.LAWS_API_URL ||"http://localhost:3000",
};



module.exports = env;