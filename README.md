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
- [Instalación](#instalación)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Descripción

**Techtonics Backend** es un proyecto escrito en TypeScript que utiliza **Express.js** junto con **TypeORM** para interactuar con la base de datos. La arquitectura está pensada para ser modular y extensible, ofreciendo un punto de partida robusto para proyectos de API REST.

### Beneficios

- Código fuertemente tipado con TypeScript.
- Arquitectura por módulos que facilita el mantenimiento.
- Utilidades de caché, manejo de errores y logging integradas.
- Listo para Docker y despliegue en producción.

---

## Tecnologías

- **TypeScript**: Tipado estático sobre JavaScript.
- **Express.js**: Framework minimalista para HTTP.
- **TypeORM**: ORM para trabajar con distintas bases de datos.
- **JWT (jsonwebtoken)**: Autenticación basada en tokens.
- **Bcrypt**: Hashing seguro de contraseñas.
- **Cors**: Soporte para CORS.
- **Date-fns**: Manipulación de fechas.
- **PM2**: Administrador de procesos para entornos productivos.

---

## Características

- **Autenticación** con JWT y almacenamiento de sesiones.
- **Caching** con TTL, alcance local o global y persistencia opcional.
- **Conexión a Base de Datos** mediante TypeORM.
- **Logging** de solicitudes y eventos del sistema.
- **Manejo de Errores** centralizado.
- **Validaciones** con `express-validator`.
- **Estructura Modular** para añadir nuevas funcionalidades.

---

## Instalación

1. Clona el repositorio

```bash
git clone https://github.com/DeviantRacoon/techtonics-backend.git
cd techtonics-backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Copia `.env.EXAMPLE` a `.env` y ajusta las variables según tu entorno.

4. Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

---

## Comandos Disponibles

- `dev`: Ejecuta el servidor con reinicio automático.
- `build`: Compila el proyecto a JavaScript.
- `start`: Inicia la versión compilada con PM2.
- `stop`: Detiene el proceso de PM2.
- `restart`: Reinicia el proceso de PM2.
- `pm2-logs`: Muestra los registros de PM2.

---

## Estructura del Proyecto

```
techtonics-backend/
├── docker-compose.yml
├── Dockerfile
├── public/
├── src/
│   ├── app/
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

Puedes contactarme en [DeviantRacoon](https://github.com/DeviantRacoon).

