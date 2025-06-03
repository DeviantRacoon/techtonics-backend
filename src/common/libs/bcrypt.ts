import { hashSync, compareSync } from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export const hashPassword = (password: string) => {
  return hashSync(password, SALT_ROUNDS);
};

export const comparePassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};