# Rol

Actúa como un Arquitecto de Software Senior especializado en Node.js, Express.js y Clean Architecture.

Tu tarea es reorganizar completamente mi proyecto de Express.js para que tenga una arquitectura modular, mantenible, escalable y fácil de probar, sin cambiar el comportamiento de la aplicación.

## Objetivos

* Analizar toda la estructura actual del proyecto.
* Reorganizar los archivos siguiendo una arquitectura por módulos (feature-based).
* Separar correctamente responsabilidades.
* Mantener toda la funcionalidad existente.
* Refactorizar únicamente la organización del código y mover la lógica a la capa correspondiente.

## Arquitectura objetivo

La estructura final debe ser similar a:

```text
src/
│
├── app.js
├── server.js
│
├── config/
│   ├── database.js
│   ├── env.js
│   └── logger.js
│
├── routes/
│   └── index.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── validate.middleware.js
│   └── logger.middleware.js
│
├── modules/
│   │
│   ├── auth/
│   │   ├── auth.routes.js
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   ├── auth.repository.js
│   │   ├── auth.model.js
│   │   ├── auth.validation.js
│   │   └── auth.middleware.js
│   │
│   ├── users/
│   │   ├── user.routes.js
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.repository.js
│   │   ├── user.model.js
│   │   ├── user.validation.js
│   │   └── user.middleware.js
│   │
│   └── ...
│
├── services/
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── connection.js
│
├── utils/
│
└── tests/
```

## Responsabilidad de cada capa

### Routes

* Solo definen endpoints.
* No contienen lógica de negocio.
* Solo llaman al controlador.

### Controllers

* Reciben req y res.
* Obtienen parámetros.
* Llaman al Service.
* Devuelven la respuesta HTTP.
* No acceden directamente a la base de datos.

### Services

Aquí vive toda la lógica de negocio.

* Validaciones complejas.
* Reglas de negocio.
* Procesamiento de datos.
* Llamadas a repositorios.
* Integración entre diferentes módulos.

Los Services no conocen Express.

### Repositories

Toda interacción con la base de datos debe vivir aquí.

* Queries
* ORM
* SQL
* Mongo
* Prisma
* Sequelize

Los Controllers nunca deben consultar directamente la base de datos.

### Models

Solo contienen la definición de los modelos.

### Validations

Las validaciones deben separarse usando Joi, Zod o express-validator.

### Middlewares

Todos los middlewares reutilizables deben vivir en:

middlewares/

Por ejemplo:

* auth.middleware.js
* error.middleware.js
* validate.middleware.js
* upload.middleware.js
* logger.middleware.js

### Utils

Mover aquí cualquier función reutilizable:

* JWT
* Hash
* Helpers
* Formateadores
* Response Helpers
* Constantes

## Reglas importantes

* No eliminar funcionalidades.
* No cambiar rutas públicas.
* No modificar respuestas de la API.
* Mantener compatibilidad.
* Eliminar código duplicado cuando sea posible.
* Mejorar nombres de variables y funciones cuando sea necesario.
* Mantener principios SOLID.
* Aplicar Clean Code.
* Evitar archivos con demasiadas responsabilidades.
* Cada módulo debe ser independiente.

## Si encuentras código como este:

Controller -> Base de datos

Muévelo automáticamente a:

Controller -> Service -> Repository

## Si encuentras lógica de negocio dentro de una ruta

Extráela hacia el Service correspondiente.

## Si encuentras funciones reutilizables repetidas

Muévelas a Utils.

## Si existen middlewares dentro de controllers o routes

Muévelos a la carpeta middlewares.

## Al finalizar

Quiero que me entregues:

1. La nueva estructura completa de carpetas.
2. Qué archivos fueron movidos.
3. Qué archivos fueron divididos.
4. Qué cambios realizaste.
5. Qué mejoras aplicaste.
6. Si detectas malas prácticas, explícalas y corrígelas.
7. Si detectas código muerto, indícalo antes de eliminarlo.
8. Explica cualquier decisión arquitectónica importante.

No inventes funcionalidades nuevas. Solo reorganiza, refactoriza y mejora la arquitectura manteniendo el comportamiento original de la aplicación.
