import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

const TOKEN_EXPIRATION = (process.env.TOKEN_EXPIRATION || "1h") as SignOptions["expiresIn"];

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error: any) {
    return { error: error.name };
  }
};

export const getCurrentUser = (req: any): { userId: number, username: string, iat: number, exp: number } => {
  return req.user;
};
