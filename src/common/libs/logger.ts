const logger = {
  info: (message: string) => {
    console.log('\x1b[36m%s\x1b[0m', `[INFO] ${message}`);
  },
  warn: (message: string) => {
    console.log('\x1b[33m%s\x1b[0m', `[WARN] ${message}`);
  },
  error: (message: string) => {
    console.log('\x1b[31m%s\x1b[0m', `[ERROR] ${message}`);
  },
  debug: (message: string) => {
    console.log('\x1b[35m%s\x1b[0m', `[DEBUG] ${message}`);
  },
  request: (message: string) => {
    console.log('\x1b[32m%s\x1b[0m', message);
  },
};

export default logger;

