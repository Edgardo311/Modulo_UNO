const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "APP-API",
      version: "1.0.0",
      description: "API de usuarios y roles con JWT y PostgreSQL",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        AuthRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 8 },
          },
        },
        RegisterRequest: {
          allOf: [
            { $ref: "#/components/schemas/AuthRequest" },
            {
              type: "object",
              required: ["firstName", "lastName"],
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
              },
            },
          ],
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            email: { type: "string", format: "email" },
            first_name: { type: "string" },
            last_name: { type: "string" },
            is_active: { type: "boolean" },
          },
        },
        Role: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string", nullable: true },
          },
        },
        RoleCreateRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "manager" },
            description: { type: "string", nullable: true, example: "Manager role" },
          },
        },
        RoleUpdateRequest: {
          type: "object",
          required: ["description"],
          properties: {
            description: { type: "string", nullable: true, example: "Updated description" },
          },
        },
        FielUploadRequest: {
          type: "object",
          required: ["rfc", "password", "cer", "key"],
          properties: {
            rfc: { type: "string", example: "AAA010101AAA" },
            password: { type: "string", example: "passwordFiel" },
            userId: { type: "string", format: "uuid" },
            cer: { type: "string", format: "binary" },
            key: { type: "string", format: "binary" },
          },
        },
        FielSignature: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            user_id: { type: "string", format: "uuid" },
            rfc: { type: "string" },
            certificate_type: { type: "string", enum: ["EFIRMA", "CSD", "UNKNOWN"] },
            certificate_serial: { type: "string" },
            certificate_thumbprint: { type: "string" },
            certificate_subject: { type: "string" },
            certificate_issuer: { type: "string" },
            valid_from: { type: "string", format: "date-time" },
            valid_until: { type: "string", format: "date-time" },
            is_currently_valid: { type: "boolean" },
            uploaded_at: { type: "string", format: "date-time" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        SatCreateCfdiReceivedJobRequest: {
          type: "object",
          required: ["fechaInicio", "fechaFin", "fielPassword"],
          properties: {
            fechaInicio: { type: "string", format: "date-time" },
            fechaFin: { type: "string", format: "date-time" },
            rfcSolicitante: { type: "string", example: "AAA010101AAA" },
            fielPassword: { type: "string", example: "contrasenaFIEL" },
          },
        },
        SatRefreshJobRequest: {
          type: "object",
          required: ["fielPassword"],
          properties: {
            fielPassword: { type: "string", example: "contrasenaFIEL" },
          },
        },
        DocumentUploadRequest: {
          type: "object",
          required: ["file"],
          properties: {
            name: { type: "string", example: "Manual SAT 2026" },
            file: { type: "string", format: "binary" },
          },
        },
        KnowledgeDocument: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            original_filename: { type: "string" },
            mime_type: { type: "string", example: "application/pdf" },
            uploaded_by: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" },
            chunk_count: { type: "integer", example: 42 },
          },
        },
        DocumentAgentAskRequest: {
          type: "object",
          required: ["question"],
          properties: {
            question: {
              type: "string",
              example: "Que requisitos menciona el manual sobre CFDI recibidos?",
            },
          },
        },
        LegalLaw: {
          type: "object",
          properties: {
            ley: { type: "string", example: "LEY de Educación Naval" },
            reforma: { type: "string", nullable: true, example: "DOF 24/03/2023" },
            pdf: {
              type: "string",
              format: "uri",
              example: "https://www.diputados.gob.mx/LeyesBiblio/pdf_mov/Ley_de_Educacion_Naval.pdf",
            },
          },
        },
        FiscalActivity: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            code: { type: "string", example: "PROFESSIONAL" },
            name: { type: "string", example: "Profesionista" },
            description: { type: "string", example: "Actividades de Profesionistas" },
            is_active: { type: "boolean", example: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        FiscalData: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            user_id: { type: "string", format: "uuid" },
            rfc: { type: "string", example: "ABC123456XYZ01", description: "RFC (13 caracteres)" },
            cp: { type: "string", example: "28001", description: "Código postal (5 dígitos)" },
            activity_id: { type: "integer", example: 1 },
            activity_code: { type: "string", example: "PROFESSIONAL" },
            activity_name: { type: "string", example: "Profesionista" },
            activity_description: { type: "string", example: "Actividades de Profesionistas" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        FiscalDataCreateRequest: {
          type: "object",
          required: ["userId", "rfc", "cp", "activityId"],
          properties: {
            userId: { type: "string", format: "uuid", example: "550e8400-e29b-41d4-a716-446655440000" },
            rfc: { type: "string", example: "ABC123456XYZ01", description: "RFC mexicano (13 caracteres alfanuméricos)" },
            cp: { type: "string", example: "28001", description: "Código postal (5 dígitos)" },
            activityId: { type: "integer", example: 1, description: "ID de la actividad fiscal" },
          },
        },
        FiscalDataUpdateRequest: {
          type: "object",
          properties: {
            rfc: { type: "string", example: "ABC123456XYZ01", description: "RFC mexicano (13 caracteres alfanuméricos)" },
            cp: { type: "string", example: "75001", description: "Código postal (5 dígitos)" },
            activityId: { type: "integer", example: 2, description: "ID de la actividad fiscal" },
          },
        },
        LegalLawSyncResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            runId: { type: "string", format: "uuid" },
            totalExtracted: { type: "integer", example: 320 },
            totalUpserted: { type: "integer", example: 320 },
            skipped: { type: "boolean", example: false },
            reason: { type: "string", example: "SYNC_IN_PROGRESS" },
          },
        },
      },
    },
    paths: {
      "/api/v1/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Registro de usuario",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterRequest" },
              },
            },
          },
          responses: { 201: { description: "Usuario creado" } },
        },
      },
      "/api/v1/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login con JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthRequest" },
              },
            },
          },
          responses: { 200: { description: "Autenticado" } },
        },
      },
      "/api/v1/users": {
        get: {
          tags: ["Users"],
          summary: "Listar usuarios",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Listado" } },
        },
        post: {
          tags: ["Users"],
          summary: "Crear usuario",
          security: [{ bearerAuth: [] }],
          responses: { 201: { description: "Creado" } },
        },
      },
      "/api/v1/users/{id}": {
        get: {
          tags: ["Users"],
          summary: "Detalle de usuario",
          security: [{ bearerAuth: [] }],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "Detalle" } },
        },
        patch: {
          tags: ["Users"],
          summary: "Editar usuario",
          security: [{ bearerAuth: [] }],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "Actualizado" } },
        },
        delete: {
          tags: ["Users"],
          summary: "Borrado lógico de usuario",
          security: [{ bearerAuth: [] }],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { 204: { description: "Sin contenido" } },
        },
      },
      "/api/v1/roles": {
        get: {
          tags: ["Roles"],
          summary: "Listar roles",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Listado" } },
        },
        post: {
          tags: ["Roles"],
          summary: "Crear rol",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RoleCreateRequest" },
              },
            },
          },
          responses: { 201: { description: "Creado" } },
        },
      },
      "/api/v1/roles/{id}": {
        patch: {
          tags: ["Roles"],
          summary: "Editar rol",
          security: [{ bearerAuth: [] }],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RoleUpdateRequest" },
              },
            },
          },
          responses: { 200: { description: "Actualizado" } },
        },
        delete: {
          tags: ["Roles"],
          summary: "Borrar rol",
          security: [{ bearerAuth: [] }],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
          responses: { 204: { description: "Sin contenido" } },
        },
      },
      "/api/v1/fiel": {
        post: {
          tags: ["FIEL"],
          summary: "Registrar FIEL (CER + KEY)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: { $ref: "#/components/schemas/FielUploadRequest" },
              },
            },
          },
          responses: {
            201: {
              description: "FIEL registrada",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/FielSignature" },
                },
              },
            },
            400: { description: "Validacion fallida o certificado no vigente" },
            401: { description: "No autenticado" },
            403: { description: "Sin permisos" },
          },
        },
      },
      "/api/v1/fiel/user/{userId}": {
        get: {
          tags: ["FIEL"],
          summary: "Listar historial FIEL por usuario",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "path", name: "userId", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            200: { description: "Listado de registros FIEL" },
            401: { description: "No autenticado" },
            403: { description: "Sin permisos" },
          },
        },
      },
      "/api/v1/fiel/{id}": {
        get: {
          tags: ["FIEL"],
          summary: "Obtener registro FIEL por id",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "path", name: "id", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            200: { description: "Registro encontrado" },
            401: { description: "No autenticado" },
            403: { description: "Sin permisos" },
            404: { description: "No encontrado" },
          },
        },
      },
      "/api/v1/sat-downloads/cfdi-received/jobs": {
        post: {
          tags: ["SAT Downloads"],
          summary: "Crear job asincrono para descarga masiva de CFDI recibidos",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SatCreateCfdiReceivedJobRequest" },
              },
            },
          },
          responses: {
            201: { description: "Job creado" },
            400: { description: "Solicitud invalida" },
            401: { description: "No autenticado" },
            404: { description: "No se encontro FIEL del usuario" },
          },
        },
      },
      "/api/v1/sat-downloads/jobs/{jobId}": {
        get: {
          tags: ["SAT Downloads"],
          summary: "Consultar estado local de un job SAT",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "path", name: "jobId", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            200: { description: "Estado del job" },
            401: { description: "No autenticado" },
            403: { description: "Sin permisos" },
            404: { description: "Job no encontrado" },
          },
        },
      },
      "/api/v1/sat-downloads/jobs/{jobId}/refresh": {
        post: {
          tags: ["SAT Downloads"],
          summary: "Refrescar estado SAT y descargar paquetes pendientes",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "path", name: "jobId", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SatRefreshJobRequest" },
              },
            },
          },
          responses: {
            200: { description: "Job actualizado" },
            400: { description: "Solicitud invalida" },
            401: { description: "No autenticado" },
            403: { description: "Sin permisos" },
            404: { description: "Job no encontrado" },
          },
        },
      },
      "/api/v1/sat-downloads/jobs/{jobId}/cfdis": {
        get: {
          tags: ["SAT Downloads"],
          summary: "Listar CFDI XML descargados por job",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "path", name: "jobId", required: true, schema: { type: "string", format: "uuid" } },
            { in: "query", name: "page", required: false, schema: { type: "integer", minimum: 1 } },
            { in: "query", name: "pageSize", required: false, schema: { type: "integer", minimum: 1, maximum: 100 } },
          ],
          responses: {
            200: { description: "Listado paginado de CFDI" },
            401: { description: "No autenticado" },
            403: { description: "Sin permisos" },
            404: { description: "Job no encontrado" },
          },
        },
      },
      "/api/v1/sat-agent/ask": {
        post: {
          tags: ["SAT Agent"],
          summary: "Enviar una pregunta al SAT Agent",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["question"],
                  properties: {
                    question: {
                      type: "string",
                      example: "¿Que regimen fiscal debo usar para una persona fisica con actividad empresarial?",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Respuesta generada por SAT Agent" },
            400: { description: "Pregunta invalida" },
            401: { description: "No autenticado" },
            500: { description: "Error interno al procesar la pregunta" },
          },
        },
      },
      "/api/v1/documents": {
        get: {
          tags: ["Documents"],
          summary: "Listar documentos de conocimiento",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Listado de documentos",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      documents: {
                        type: "array",
                        items: { $ref: "#/components/schemas/KnowledgeDocument" },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "No autenticado" },
          },
        },
        post: {
          tags: ["Documents"],
          summary: "Subir y vectorizar un PDF",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: { $ref: "#/components/schemas/DocumentUploadRequest" },
              },
            },
          },
          responses: {
            201: {
              description: "Documento procesado y vectorizado",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      document: { $ref: "#/components/schemas/KnowledgeDocument" },
                      chunkCount: { type: "integer", example: 18 },
                    },
                  },
                },
              },
            },
            400: { description: "Solicitud invalida" },
            401: { description: "No autenticado" },
            415: { description: "Tipo de archivo no soportado" },
            422: { description: "No se pudo extraer texto del PDF" },
          },
        },
      },
      "/api/v1/documents/{id}": {
        delete: {
          tags: ["Documents"],
          summary: "Eliminar documento de conocimiento",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "path", name: "id", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            200: { description: "Documento eliminado" },
            401: { description: "No autenticado" },
            404: { description: "Documento no encontrado" },
          },
        },
      },
      "/api/v1/documents-agent/ask": {
        post: {
          tags: ["Documents Agent"],
          summary: "Preguntar al agente documental",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DocumentAgentAskRequest" },
              },
            },
          },
          responses: {
            200: { description: "Respuesta del agente documental" },
            400: { description: "Pregunta invalida" },
            401: { description: "No autenticado" },
            500: { description: "Error interno" },
          },
        },
      },
      "/api/v1/legal-laws": {
        get: {
          tags: ["Legal Laws"],
          summary: "Consultar leyes sincronizadas",
          description:
            "Devuelve un arreglo JSON con objetos { ley, reforma, pdf }. Acepta filtros opcionales.",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "query",
              name: "page",
              required: false,
              schema: { type: "integer", minimum: 1, default: 1 },
            },
            {
              in: "query",
              name: "pageSize",
              required: false,
              schema: { type: "integer", minimum: 1, maximum: 200, default: 50 },
            },
            {
              in: "query",
              name: "search",
              required: false,
              schema: { type: "string" },
              description: "Filtra por texto en el nombre de la ley.",
            },
          ],
          responses: {
            200: {
              description: "Listado de leyes",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/LegalLaw" },
                  },
                },
              },
            },
            401: { description: "No autenticado" },
          },
        },
      },
      "/api/v1/fiscal-data/activities/list": {
        get: {
          tags: ["Fiscal Data"],
          summary: "Listar actividades fiscales disponibles",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Listado de actividades fiscales",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/FiscalActivity" },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "No autenticado" },
          },
        },
      },
      "/api/v1/fiscal-data": {
        post: {
          tags: ["Fiscal Data"],
          summary: "Crear datos fiscales para un usuario",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/FiscalDataCreateRequest" },
              },
            },
          },
          responses: {
            201: {
              description: "Datos fiscales creados",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: { type: "string", example: "Fiscal data created successfully" },
                      data: { $ref: "#/components/schemas/FiscalData" },
                    },
                  },
                },
              },
            },
            400: { description: "Validación fallida (RFC o CP inválido)" },
            401: { description: "No autenticado" },
            404: { description: "Usuario o actividad no encontrado" },
            409: { description: "RFC ya está en uso o usuario ya tiene datos fiscales" },
          },
        },
      },
      "/api/v1/fiscal-data/{userId}": {
        get: {
          tags: ["Fiscal Data"],
          summary: "Obtener datos fiscales de un usuario",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "userId",
              required: true,
              schema: { type: "string", format: "uuid" },
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
          ],
          responses: {
            200: {
              description: "Datos fiscales del usuario",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/FiscalData" },
                    },
                  },
                },
              },
            },
            401: { description: "No autenticado" },
            404: { description: "Usuario o datos fiscales no encontrado" },
          },
        },
        put: {
          tags: ["Fiscal Data"],
          summary: "Actualizar datos fiscales de un usuario",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "userId",
              required: true,
              schema: { type: "string", format: "uuid" },
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/FiscalDataUpdateRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "Datos fiscales actualizados",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: { type: "string", example: "Fiscal data updated successfully" },
                      data: { $ref: "#/components/schemas/FiscalData" },
                    },
                  },
                },
              },
            },
            400: { description: "Validación fallida (RFC o CP inválido)" },
            401: { description: "No autenticado" },
            404: { description: "Usuario o datos fiscales no encontrado" },
            409: { description: "RFC ya está en uso por otro usuario" },
          },
        },
        delete: {
          tags: ["Fiscal Data"],
          summary: "Eliminar datos fiscales de un usuario",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "userId",
              required: true,
              schema: { type: "string", format: "uuid" },
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
          ],
          responses: {
            204: { description: "Datos fiscales eliminados" },
            401: { description: "No autenticado" },
            404: { description: "Usuario o datos fiscales no encontrado" },
          },
        },
      },
      "/api/v1/legal-laws/sync": {
        post: {
          tags: ["Legal Laws"],
          summary: "Ejecutar sincronización manual de leyes",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  additionalProperties: false,
                },
              },
            },
          },
          responses: {
            200: {
              description: "Sincronización ejecutada",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LegalLawSyncResponse" },
                },
              },
            },
            202: {
              description: "Sincronización omitida porque ya hay una en progreso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LegalLawSyncResponse" },
                },
              },
            },
            401: { description: "No autenticado" },
            502: { description: "No se pudo extraer información desde el origen" },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;