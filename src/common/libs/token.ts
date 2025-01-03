import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";

const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

export const generateRefreshToken = (payload: any): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

export const verifyToken = (token: string, isRefresh = false): any => {
  try {
    const secret = isRefresh ? JWT_REFRESH_SECRET : JWT_SECRET;
    return jwt.verify(token, secret);
  } catch (error: any) {
    return { error: error.name };
  }
};

export const getCurrentUser = (req: any): { userId: number, username: string, iat: number, exp: number } => {
  return req.user;
};
