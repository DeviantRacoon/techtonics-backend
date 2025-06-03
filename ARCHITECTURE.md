# Arquitectura

Este documento describe la organización interna de **Techtonics Backend** y cómo se procesan las peticiones.

## Vista General

La aplicación está construida con **Express.js** y utiliza **TypeORM** para la capa de persistencia. El código sigue un enfoque modular centrado en dominios para facilitar el mantenimiento y la escalabilidad.

## Carpetas Principales

- **src/app/modules**: módulos de dominio. Dentro de cada módulo encontrarás:
  - `domain/models` – modelos de dominio y validadores.
  - `infrastructure/entities` – entidades de TypeORM.
  - `infrastructure/repositories` – repositorios que extienden `BaseRepository`.
  - `services` – lógica de negocio y controladores.
- **src/app/routes**: define los endpoints de la API agrupados por dominio.
- **src/app/core**: clases base y utilidades compartidas por los repositorios y servicios.
- **src/common**: código reutilizable:
  - `handlers` – utilidades para criterios y paginación.
  - `libs` – helpers como logger, generación de tokens y bcrypt.
  - `middlewares` – middlewares globales de autenticación, logging, validación y respuestas.
- **src/config**: configuración de servidor, rutas y conexión a la base de datos.
- **public**: archivos estáticos.
- **Dockerfile / docker-compose.yml**: contenedores para la aplicación y la base de datos MySQL.

## Flujo de Petición

1. El cliente realiza una solicitud HTTP a los endpoints definidos en `src/app/routes`.
2. La petición atraviesa los middlewares globales (logger, limpieza de parámetros, autenticación, etc.).
3. El controlador de la ruta delega en un servicio del módulo correspondiente.
4. Los servicios interactúan con los repositorios de TypeORM para leer o modificar datos.
5. El middleware `response.middleware.ts` envuelve la respuesta en un formato estándar.

## Consideraciones

- La configuración de TypeORM se encuentra en `src/config/typeorm.ts` y permite cambiar el motor de base de datos mediante variables de entorno.
- Cada módulo puede ampliarse con nuevas entidades y servicios sin afectar al resto de dominios.
- Las migraciones de base de datos se generan y ejecutan con los scripts de TypeORM incluidos en `package.json`.
