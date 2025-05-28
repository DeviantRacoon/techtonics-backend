import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@libs/token';

import userSessionRepository from '@modules/users/infrastructure/repositories/user-session.repository';

import dotenv from '@config/dotenv';
dotenv.config();

const EXCLUDE_ROUTES = ['/api/auth/login', '/'];
const UNAUTHORIZED_MESSAGE = "Access Denied: Unauthorized access. Please provide a valid token.";

const validateTokens = async (token: string, refreshToken: string) => {
  const refreshTokenSession = await userSessionRepository.getOneByParams({ token: refreshToken, status: 'active' });

  if (!refreshTokenSession) {
    return { valid: false, message: UNAUTHORIZED_MESSAGE };
  }

  const tokenData = verifyToken(token);
  if (tokenData.error) {
    if (tokenData.error !== 'TokenExpiredError') {
      return { valid: false, message: UNAUTHORIZED_MESSAGE };
    }

    const refreshTokenData = verifyToken(refreshToken, true);
    if (refreshTokenData.error) {
      return { valid: false, message: UNAUTHORIZED_MESSAGE };
    }

    return { valid: true, userData: refreshTokenData };
  }

  return { valid: true, userData: tokenData };
};

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  if (EXCLUDE_ROUTES.includes(req.path)) return next();

  const token = req.headers['authorization'];
  const refreshToken = req.headers['x-refresh-token'] as string;

  if (!token) {
    return res.status(401).json({ ok: false, message: UNAUTHORIZED_MESSAGE });
  }

  const { valid, userData, message } = await validateTokens(token, refreshToken);
  if (!valid) {
    return res.status(401).json({ ok: false, message });
  }

  (req as any).user = userData;
  next();
};

export default authMiddleware;
