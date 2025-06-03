# Arquitectura

Este documento describe la arquitectura general de **Techtonics Backend**.

## Vista General

El proyecto está construido con **Express.js** y **TypeORM**. El código fuente se organiza en carpetas que siguen un enfoque modular.

## Carpetas Principales

- **src/app/modules**: Contiene los módulos de dominio. Cada módulo agrupa modelos (entidades), repositorios, servicios y validadores.
- **src/app/routes**: Define las rutas de la API y organiza los endpoints por dominio.
- **src/common**: Funcionalidades compartidas:
  - `handlers`: utilidades (caché, paginación, etc.).
  - `libs`: librerías (logger, token JWT, bcrypt).
  - `middlewares`: middlewares globales (autenticación, logger, limpieza de parámetros, manejo de respuestas).
- **src/config**: Configuración del servidor, cargado de variables de entorno y definición de rutas.
- **public**: Archivos estáticos que se sirven directamente.
- **Dockerfile / docker-compose.yml**: Archivos de despliegue para contenerización y base de datos.

## Flujo de Petición

1. El cliente realiza una solicitud HTTP a uno de los endpoints declarados en `src/app/routes`.
2. Las peticiones pasan por los middlewares globales, donde se registra la solicitud, se valida el token JWT y se prepara la respuesta.
3. El controlador de la ruta invoca a los servicios del módulo correspondiente.
4. Los servicios utilizan los repositorios de TypeORM para consultar o modificar la base de datos.
5. Se devuelve la respuesta con el formato estándar definido en el middleware `response.middleware.ts`.

## Consideraciones

- El proyecto utiliza TypeORM y se puede conectar a diferentes motores de base de datos configurando el `DataSource`.
- El sistema de caché permite minimizar consultas repetidas y puede persistir datos en disco.
- Cada módulo puede expandirse con nuevas entidades o rutas sin afectar a otros dominios.

