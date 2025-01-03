import winston from "winston";
import fs from "fs";
import path from "path";

import dotenv from "./dotenv";
dotenv.config();

const ensureLogDirectory = (logDir: string) => {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
};

const createCustomLogger = (logDir: string = "./logs", level: string = "info", prettyPrint: boolean = false) => {
  ensureLogDirectory(logDir);

  const logFilePaths = {
    error: path.join(logDir, "error.log"),
    warn: path.join(logDir, "warn.log"),
    info: path.join(logDir, "info.log"),
    debug: path.join(logDir, "debug.log"),
  };

  const transports: winston.transport[] = [
    new winston.transports.File({
      filename: logFilePaths.error,
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: logFilePaths.warn,
      level: "warn",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: logFilePaths.info,
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: logFilePaths.debug,
      level: "debug",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
  ];

  if (process.env.NODE_ENV === "development") {
    transports.push(
      new winston.transports.Console({
        level: "debug",  
        format: winston.format.combine(
          winston.format.colorize({ all: true }),  
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`; 
          })
        ),
      })
    );
  } else {
    transports.push(
      new winston.transports.Console({
        level: "info", 
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`; 
          })
        ),
      })
    );
  }

  // Crear el logger con todos los transportes configurados
  const logger = winston.createLogger({
    level,
    transports,
  });

  return logger;
};

// Crear una instancia del logger
const logger = createCustomLogger("./logs", "debug", process.env.NODE_ENV === "development");

export default logger;
