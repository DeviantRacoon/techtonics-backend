# Techtonics-Backend

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

## Descripción <a name="descripción"></a>

**Techtonics-Backend** es un proyecto backend desarrollado en TypeScript utilizando **Express.js** como framework principal. Este backend está diseñado para manejar operaciones del servidor y conectarse a una base de datos mediante **Prisma**, proporcionando un conjunto robusto de herramientas para desarrollo y producción.

### Beneficios:

- Código tipado y robusto gracias a TypeScript.
- Arquitectura escalable para crecimiento del proyecto.
- Herramientas preconfiguradas para desarrollo rápido y eficiente.
- Funcionalidades integradas para autenticación, validaciones, logging y manejo de errores.
- Manejo de cache completo con TTL y FIFO.

---

## Tecnologías <a name="tecnologías"></a>

Techtonics-Backend utiliza las siguientes tecnologías y paquetes:

- **TypeScript**: Superconjunto de JavaScript con tipado estático.
- **Express.js**: Framework minimalista para aplicaciones web.
- **Prisma**: ORM moderno y flexible para manejar bases de datos.
- **JWT (jsonwebtoken)**: Implementación de autenticación basada en tokens.
- **Bcrypt**: Hashing seguro de contraseñas.
- **Cors**: Permite solicitudes de recursos entre diferentes orígenes.
- **Date-fns**: Biblioteca para manipulación y formateo de fechas.
- **winston**: Logger rápido y de bajo consumo de recursos.
- **PM2**: Administrador de procesos para aplicaciones Node.js.

---

## Características <a name="características"></a>

- **Autenticación**: Manejo de autenticación segura con JWT.
- **Caching**: Sistema de caché eficiente con TTL y FIFO para mejorar el rendimiento reduciendo la carga en la base de datos.
- **Conexión a Base de Datos**: Configuración simplificada utilizando Prisma.
- **Herramientas de Reducción Código**: Herramientas y técnicas utilizadas para reducir y optimizar el código en el proyecto.
- **Logging**: Registro eficiente de eventos con Pino.
- **Manejo de Errores**: Centralización de errores y respuestas estandarizadas.
- **Modularidad**: Estructura modular y extensible para añadir nuevas funcionalidades.
- **Validaciones**: Validación de datos de entrada mediante `express-validator`.

---

## Instalación <a name="instalación"></a>

Sigue estos pasos para instalar y configurar el proyecto:

1. Clona el repositorio:

```bash
git clone https://github.com/DeviantRacoon/techtonics-backend.git
cd techtonics-backend
```

2.  Instala las dependencias

```bash
npm install
```

3. Crea un archivo .env en la raíz del proyecto y define las variables de entorno necesarias, tienes un ejemplo llamado **env.EXAMPLE**.

4. Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

## Comandos Disponibles <a name="comandos-disponibles"></a>

Techtonics-Backend incluye los siguientes scripts:

- dev: Inicia el servidor en modo desarrollo usando nodemon.
- start: Inicia el servidor en modo producción con pm2.
- stop: Detiene el servidor con pm2.
- restart: Reinicia el servidor con pm2.
- build: Compila el proyecto TypeScript.
- pm2-logs: Muestra los logs del servidor con pm2.

## Estructura del Proyecto <a name="estructura-del-proyecto"></a>

```
Techtonics-Backend/
├── docker-compose.yml
├── Dockerfile
├── logs/
│   ├── debug.log
│   ├── error.log
│   ├── info.log
│   └── warn.log
├── prisma/
│   └── schema.prisma
├── public/
│   ├── pug/
│   ├── template/
│   └── index.html
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   └── module-1/
│   │   │       ├── models/
│   │   │       ├── repositories/
│   │   │       ├── services/
│   │   │       └── validator/
│   │   └── routes/
│   │       ├── subroute-2/
│   │       │   └── subroute.route.ts
│   │       ├── subroute-1/
│   │       │   └── subroute.route.ts
│   │       └── index.routes.ts
│   ├── common/
│   │   ├── handlers/
│   │   ├── libs/
│   │   └── middlewares/
│   ├── config/
│   └── index.ts
├── .env
```
## Contribuciones <a name="contribuciones"></a>

Las contribuciones son bienvenidas. Puedes reportar errores, sugerir mejoras o enviar pull requests para nuevas funcionalidades. Por favor, abre un [issue](https://github.com/DeviantRacoon/techtonics-backend/issues) antes de trabajar en cambios significativos.

## Licencia <a name="licencia"></a>

Este proyecto está licenciado bajo la [Licencia Apache 2.0](LICENSE).

## Contacto <a name="contacto"></a>

Para consultas, problemas o sugerencias, puedes contactarme a través de mi perfil de GitHub: [DeviantRacoon](https://github.com/DeviantRacoon).