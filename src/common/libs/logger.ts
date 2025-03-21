import chalk from "chalk";

const logger = {
  info: (message: string) => {
    console.log(chalk.blue(`[INFO] ${message}`));
  },
  warn: (message: string) => {
    console.log(chalk.yellow(`[WARN] ${message}`));
  },
  error: (message: string) => {
    console.log(chalk.red(`[ERROR] ${message}`));
  },
  debug: (message: string) => {
    console.log(chalk.magenta(`[DEBUG] ${message}`));
  },
  request: (message: string) => {
    console.log(chalk.green(message));
  },
};

export default logger;
