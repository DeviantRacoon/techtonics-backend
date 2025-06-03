# Techtonics Backend

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-Apache_2.0-blue.svg)](/LICENSE)

</div>

---

## Tabla de Contenidos
- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts](#scripts)
- [Uso con Docker](#uso-con-docker)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Descripción

**Techtonics Backend** es una API escrita en TypeScript que emplea **Express.js** y **TypeORM**. La arquitectura se basa en módulos de dominio para que el código sea fácil de mantener y extender.

### Beneficios

- Código fuertemente tipado con TypeScript.
- Diseño modular inspirado en Domain Driven Design.
- Autenticación con JWT y contraseñas hasheadas con bcrypt.
- Listo para contenedores Docker y despliegue en producción.

---

## Tecnologías

- **Node.js 18**
- **TypeScript**
- **Express.js**
- **TypeORM** (MySQL por defecto)
- **JWT (jsonwebtoken)**
- **Bcryptjs**
- **PM2**

---

## Características

- Gestión de usuarios, roles y sesiones.
- Middlewares globales para logging, autenticación y manejo de errores.
- Repositorios y servicios basados en TypeORM.
- Migraciones de base de datos con TypeORM CLI.
- Dockerfile y docker-compose para ambiente local.

---

## Requisitos Previos

- Node.js 18 o superior
- npm o pnpm
- MySQL (o Docker para levantar la base de datos)

---

## Instalación

1. Clona el repositorio

```bash
git clone https://github.com/DeviantRacoon/techtonics-backend.git
cd techtonics-backend
```

2. Instala las dependencias

```bash
npm install
```

3. Copia `.env.EXAMPLE` a `.env` y ajusta las variables

4. Ejecuta las migraciones de TypeORM

```bash
npm run migration:run
```

5. Inicia el servidor en modo desarrollo

```bash
npm run dev
```

---

## Variables de Entorno

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="mysql://user:pass@localhost:3306/mydb"
SALT_ROUNDS=10
JWT_SECRET="mysecret"
JWT_REFRESH_SECRET="myrefresh"
TOKEN_EXPIRATION=10m
REFRESH_TOKEN_EXPIRATION=7d
```

---

## Scripts

- `dev` – Ejecuta el servidor con nodemon.
- `build` – Compila el proyecto a JavaScript.
- `start` – Inicia la versión compilada con PM2.
- `stop` – Detiene el proceso de PM2.
- `restart` – Reinicia el proceso de PM2.
- `pm2-logs` – Muestra los registros de PM2.
- `migration:generate` – Crea una nueva migración.
- `migration:run` – Ejecuta las migraciones pendientes.
- `migration:revert` – Revierte la última migración.

---

## Uso con Docker

Para levantar un contenedor MySQL de desarrollo puedes ejecutar:

```bash
docker-compose up -d
```

Una vez la base de datos esté lista, ejecuta las migraciones y arranca la aplicación.

---

## Estructura del Proyecto

```
techtonics-backend/
├── docker-compose.yml
├── Dockerfile
├── public/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── modules/
│   │   └── routes/
│   ├── common/
│   │   ├── handlers/
│   │   ├── libs/
│   │   └── middlewares/
│   ├── config/
│   └── index.ts
└── .env
```

---

## Contribuciones

Las contribuciones son bienvenidas. Abre un [issue](https://github.com/DeviantRacoon/techtonics-backend/issues) para reportar errores o proponer mejoras.

---

## Licencia

Este proyecto está bajo la [Licencia Apache 2.0](LICENSE).

---

## Contacto

[DeviantRacoon](https://github.com/DeviantRacoon)
